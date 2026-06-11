import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { retry, catchError, throwError, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { Tokenservice } from '../services/tokenservice/tokenservice';
import {Authservice} from '../services/auth/authservice';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Tokenservice);
  const authService=inject(Authservice)
  const router = inject(Router);
  return next(req).pipe(
    // ۱. منطق ریتری هوشمند (فقط برای خطاهای موقت)
    retry({
      count: 2,
      delay: (error: HttpErrorResponse, retryCount: number) => {
        if (error.status === 0 || error.status >= 500) {
          return timer(1000); // ⬅️ اصلاح: استفاده از timer به جای عدد ساده
        }
        throw error;
      },
    }),

    // ۲. مدیریت خطاهای خاص (رفرش توکن و لاگ‌اوت)
    catchError((error: HttpErrorResponse) => {
      // الف) خطای 401 - تلاش برای رفرش توکن
      if (error.status === 401) {
        // اگر رفرش توکن داریم، تلاش برای تمدید
        if (tokenService.getRefreshToken()) {
          return authService.refreshToken() .pipe(
            switchMap(token => {
             const accessToken = token.data?.accessToken;
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` },
              });
              return next(newReq);
            }),
            catchError((refreshError) => {
              // اگر رفرش هم شکست خورد، لاگ‌اوت
              tokenService.clearTokens();
              router.navigate(['/login']);
              return throwError(() => refreshError);
            }),
          );
        } else {
          // رفرش توکن نداریم، مستقیم لاگ‌اوت
          tokenService.clearTokens();
          router.navigate(['/login']);
          return throwError(() => error);
        }
      }

      // ب) خطای 403 - عدم دسترسی (نیازی به رفرش نیست)
      if (error.status === 403) {
        router.navigate(['/unauthorized']); // یا نمایش پیام
        return throwError(() => error);
      }

      // ج) بقیه خطاها (400, 404, 500 نهایی و ...)
      return throwError(() => error);
    }),
  );
};

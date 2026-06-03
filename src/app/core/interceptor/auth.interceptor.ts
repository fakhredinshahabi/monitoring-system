import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Tokenservice } from '../services/tokenservice/tokenservice';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { Authservice } from '../services/auth/authservice';
import { primitive } from '@primeuix/themes/aura/base';
import {
  _ErrorAuth,
  _LoginData,
  _RegisterData,
} from '../interfaces/auth.interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Authservice);
  const tokenService = inject(Tokenservice);
  const accessToken = tokenService.getAccessToken();

  const authRout = ['/login', '/register', '/refresh'];
  const skipToken = authRout.some((url) => req.url.includes(url));
  if (skipToken) return next(req);
  if (accessToken) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) return throwError(() => err); // یا توکن‌ها رو پاک کن + router.navigateByUrl('/login')

        return authService.refreshToken().pipe(
          tap((res: any) =>
            tokenService.saveTokens(
              res.data.accessToken,
              res.data.refreshToken,
            ),
          ), // ذخیره توکن‌های جدید
          switchMap((res: any) => {
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.accessToken}` },
            });
            return next(newReq); // 🔁 ریتری خودکار درخواست اصلی با توکن جدید
          }),
        );
      }
      return throwError(() => err);
    }),
  );
};

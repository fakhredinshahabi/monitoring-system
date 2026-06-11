import { HttpInterceptorFn } from '@angular/common/http';
import { Tokenservice } from '../services/tokenservice/tokenservice';
import { inject } from '@angular/core';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService=inject(Tokenservice)
  const accessToken=tokenService.getAccessToken()
  const specialRoot= ['/login','/register','/refresh']
  const skipRout = specialRoot.some(url=>req.url.includes(url))
  if (skipRout) return  next(req);
   if (accessToken) {
    req =req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
  }
   return next(req)
};

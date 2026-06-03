import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Tokenservice } from '../services/tokenservice/tokenservice';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(Tokenservice);
  const router = inject(Router);
  return token.isLoggedIn() ? true : router.createUrlTree(['/login']);
};

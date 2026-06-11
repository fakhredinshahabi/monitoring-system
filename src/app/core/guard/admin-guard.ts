import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Tokenservice } from '../services/tokenservice/tokenservice';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = inject(Tokenservice);
  const router = inject(Router);
   return token.isAdmin() ? true : router.createUrlTree(['/login']);
};

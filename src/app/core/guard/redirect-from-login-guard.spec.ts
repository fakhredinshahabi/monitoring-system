import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectFromLoginGuard } from './redirect-from-login-guard';

describe('redirectFromLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectFromLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

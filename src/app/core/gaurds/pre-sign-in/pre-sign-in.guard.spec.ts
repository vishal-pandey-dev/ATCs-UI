import { TestBed } from '@angular/core/testing';

import { PreSignInGuard } from './pre-sign-in.guard';

describe('PreSignInGuard', () => {
  let guard: PreSignInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreSignInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

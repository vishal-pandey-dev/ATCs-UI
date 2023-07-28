import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { serverResolver } from './server.resolver';

describe('serverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => serverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

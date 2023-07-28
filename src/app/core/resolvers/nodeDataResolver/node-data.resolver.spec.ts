import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { nodeDataResolver } from './node-data.resolver';

describe('nodeDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => nodeDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

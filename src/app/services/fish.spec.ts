import { TestBed } from '@angular/core/testing';

import { Fish } from './fish';

describe('Fish', () => {
  let service: Fish;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fish);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommonGridService } from './common-grid.service';

describe('CommonGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonGridService = TestBed.get(CommonGridService);
    expect(service).toBeTruthy();
  });
});

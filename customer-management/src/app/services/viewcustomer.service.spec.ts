import { TestBed } from '@angular/core/testing';

import { ViewcustomerService } from './viewcustomer.service';

describe('ViewcustomerService', () => {
  let service: ViewcustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewcustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GetIPAdressService } from './get-ipadress.service';

describe('GetIPAdressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetIPAdressService = TestBed.get(GetIPAdressService);
    expect(service).toBeTruthy();
  });
});

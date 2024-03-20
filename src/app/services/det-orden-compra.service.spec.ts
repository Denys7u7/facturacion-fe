import { TestBed } from '@angular/core/testing';

import { DetOrdenCompraService } from './det-orden-compra.service';

describe('DetOrdenCompraService', () => {
  let service: DetOrdenCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetOrdenCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

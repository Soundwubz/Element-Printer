import { TestBed } from '@angular/core/testing';

import { ElementPrinterService } from './element-printer.service';

describe('ElementPrinterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementPrinterService = TestBed.get(ElementPrinterService);
    expect(service).toBeTruthy();
  });
});

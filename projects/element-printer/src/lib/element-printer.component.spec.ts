import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPrinterComponent } from './element-printer.component';

describe('ElementPrinterComponent', () => {
  let component: ElementPrinterComponent;
  let fixture: ComponentFixture<ElementPrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementPrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

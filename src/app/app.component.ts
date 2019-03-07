import { Component, Renderer2, OnInit, AfterViewInit } from '@angular/core';

import { ElementPrinterComponent } from 'element-printer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
  ) {}

  title = 'Element Printer Demo';

  ngAfterViewInit() {
    console.dir(this.renderer.selectRootElement('#toPrint', true));
    console.dir(this.renderer.selectRootElement('#toPrint', true).outerHTML);
    console.dir(this.renderer.selectRootElement('#toPrint', true).style);
  }
}

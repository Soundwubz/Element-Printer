import { Component, OnInit, Output, EventEmitter, Input, Renderer2 } from '@angular/core';
import { style } from '@angular/animations';

@Component({
  selector: 'el-printer',
  templateUrl: 'element-printer.component.html',
  styleUrls: ['element-printer.component.scss'],
})
export class ElementPrinterComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
  ) { }

  @Input() containerToPrint: string;
  /* @Output() printHandler = new EventEmitter<any>(); */

  slice = Function.call.bind(Array.prototype.slice);
  style;

  print() {
    const sudo = this;
    const container = this.renderer.selectRootElement('#' + this.containerToPrint, true);
    console.dir(container);
    this.slice(document.styleSheets).filter(filterSheets);
    let styleText;

    function filterSheets(item) {
      if (item.href === null) {
        const rules = sudo.slice(item.rules);
        if (rules.length < 100) {
          return rules.filter(filterRules);
        }
      } else {
        return false;
      }
    }

    function filterRules(item) {
      if (item.selectorText !== undefined) {
        if (item.selectorText.includes(container.className)) {
          console.log('class found: ' + item.selectorText);
          styleText = item.cssText;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    // Creating Print Window

    const win = window.open('', 'Element Printer', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Element Printer</title>');
    win.document.write('<style>');
    // Style goes here
    win.document.write(styleText);
    win.document.write('</style>');
    win.document.write('</head><body style="margin: 0 auto;">');
    win.document.write(container.outerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();

  }

  ngOnInit() {
  }

}

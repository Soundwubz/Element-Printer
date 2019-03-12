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

  slice = Function.call.bind(Array.prototype.slice);

  print() {
    const sudo = this;
    const container = this.renderer.selectRootElement('#' + this.containerToPrint, true);
    const childElements = this.slice(container.children);
    const classes = [];
    console.dir(container);
    // tslint:disable-next-line: deprecation
    this.slice(document.all).forEach(x => {
      if (container.contains(x)) { // gets each element within the container; use this to get the class names and styles
        x.classList.forEach(y => {
          classes.push(y);
        });
      }
    });
    console.log('classes: ');
    console.dir(classes);
    let styleText;
    this.slice(document.styleSheets).filter(filterSheets);

    function filterSheets(item) {
      if (item.href === null) {
        const rules = sudo.slice(item.rules);
        return rules.filter(filterRules);
      } else {
        return false;
      }
    }

    function filterRules(item) {
      if (item.selectorText !== undefined) {
        classes.forEach(x => {
          if (item.selectorText.includes(x)) { // Go through classes and get styles;
            if (styleText !== undefined) {
              styleText = styleText + ' ' + item.cssText;
            } else {
              styleText = item.cssText;
            }
            return true;
          } /* else { // check if children match selector text
            childElements.forEach(child => {
              if (item.selectorText.includes(child.className)) { // Go through classes and get styles;
                if (styleText !== undefined) {
                  styleText = styleText + ' ' + item.cssText;
                } else {
                  styleText = item.cssText;
                }
                return true;
              } else {
                return false;
              }
            });
          } */
        });
      } else {
        return false;
      }
    }

    if (styleText.includes('background-image')) {
      console.warn('Defined container has styles that utilizes a background-image. ' +
       'Unless your browser settings allow for you to print background images.');
      console.dir(styleText.indexOf('background-image'));
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

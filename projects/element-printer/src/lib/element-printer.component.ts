import { Component, OnInit, Output, EventEmitter, Input, Renderer2 } from '@angular/core';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'el-printer',
  templateUrl: 'element-printer.component.html',
  styleUrls: ['element-printer.component.scss'],
})
export class ElementPrinterComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
  ) { }

  @Input() containerToPrint: string;
  @Input() enableDebug = false;

  slice = Function.call.bind(Array.prototype.slice);

  print() {
    const container = this.renderer.selectRootElement('#' + this.containerToPrint, true);
    const classes = [];
    let styleText = '#' + this.containerToPrint + ' { margin: 0 auto; }';
    let mediaText = '';
    // tslint:disable-next-line: deprecation
    this.slice(document.all).forEach(x => {
      if (container.contains(x)) { // gets each element within the container; use this to get the class names and styles
        let selector = '';
        if (x.classList.length > 1) {
          // get all of the classes to be used as selectors
          x.classList.forEach(function(cl, i) {
            i = i + 1;
            if (i === x.classList.length) {
              selector = selector + ' .' + cl;
            } else {
              selector = selector + ' .' + cl + ', ';
            }
          });
        } else if (x.classList.length === 1) {
          selector = '.' + x.classList[0];
        } else {
          selector = x.localName;
        }
        const cssText = window.getComputedStyle(x).cssText;
        styleText = styleText + ' ' + selector + ' { ' + cssText + ' } ';
      }
    });
    this.slice(document.styleSheets).forEach(x => {
      if (x.href === null) {
        if (x.cssRules !== undefined) {
          this.slice(x.cssRules).forEach(y => {
            if (y.media !== undefined) {
              if (y.media.length > 0) {
                mediaText = mediaText + y.cssText + ' ';
              }
            }
          });
        }
      }
    });
    if (this.enableDebug) {
      console.dir(container);
      /*
        Switch over to getting the computed styles of each element.
        Getting an element's computed styles is fairly simple
        Programatically getting all of the elements within the container is the difficult part
      */
      console.log('computed styles: ');
      console.dir(window.getComputedStyle(container));
      console.log('classes: ');
      console.dir(classes);
      console.log('document.styleSheets: ');
      console.dir(document.styleSheets);
    }

    if (styleText.includes('background-image')) {
      console.warn('Defined container has styles that utilizes a background-image. ' +
       'Unless your browser settings allow for you to print background images. ' +
       'View guide here: https://github.com/Soundwubz/Element-Printer/blob/master/PRINTGUIDE.md');
    }

    // Creating Print Window
    const win = window.open('', 'Element Printer', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Element Printer</title>');
    win.document.write('<style>');
    // Media styles go here
    win.document.write(mediaText);
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

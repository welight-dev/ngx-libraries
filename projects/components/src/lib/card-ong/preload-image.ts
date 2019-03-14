import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[wePreloadImage]'
})
export class WePreloadImage {
  /** directive element */
  private element: HTMLElement;

  /** image url to preload */
  @Input()
  private preloadUrl: string;

  /** constructor */
  constructor(private _elRef: ElementRef) {
    this.element = this._elRef.nativeElement;
  }

  /** is image element `<img />` */
  private get isImageElement(): boolean {
    return this.element.tagName.toLowerCase() === 'img';
  }

  /** preload url */
  private preload(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      /** loaded */
      image.onload = () => resolve(url);
      image.src = url;

      if (image.complete) {
        resolve(url);
      }

      /** error on load */
      image.onerror = e => reject(e);
    });
  }
}

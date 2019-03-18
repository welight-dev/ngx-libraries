import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[wePlaceholderItem], [welightPlaceholderItem]',
  host: {
    class: 'we-placeholder-item',
  },
})
export class WelightPlaceholderItem implements OnInit {
  /** HTML element */
  private element: HTMLElement;

  /** width of placeholder item */
  @Input() width: string = '100%';

  /** height of placeholder item */
  @Input() height: string = '15px';

  /** margin-top of placeholder item */
  @Input() mTop: string;

  /** margin-bottom of placeholder item */
  @Input() mBottom: string;

  /** margin-left of placeholder item */
  @Input() mLeft: string;

  /** margin-right of placeholder item */
  @Input() mRight: string;

  /** radius */
  @Input() radius: string;

  /** constructor */
  constructor(private elRef: ElementRef, private renderer: Renderer) {
    this.element = elRef.nativeElement;
  }

  /** on init element */
  ngOnInit() {
    /** element style */
    this.renderer.setElementStyle(this.element, 'width', this.width);
    this.renderer.setElementStyle(this.element, 'height', this.height);
    this.renderer.setElementStyle(this.element, 'margin-top', this.mTop);
    this.renderer.setElementStyle(this.element, 'margin-bottom', this.mBottom);
    this.renderer.setElementStyle(this.element, 'margin-left', this.mLeft);
    this.renderer.setElementStyle(this.element, 'margin-right', this.mRight);
    this.renderer.setElementStyle(this.element, 'border-radius', this.radius);

    /** background size calc */
    const backgroundSizeWidth = this.element.offsetWidth * 3;
    const backgroundSizeHeight = this.element.offsetHeight * 3;
    const backgroundSize = `${backgroundSizeWidth}px ${backgroundSizeHeight}px`;

    this.renderer.setElementStyle(
      this.element,
      'background-size',
      backgroundSize,
    );
  }
}

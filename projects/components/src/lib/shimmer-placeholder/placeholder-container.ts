import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Subject } from 'rxjs';

import { welightShimmerAnimations } from './shimmer-animations';

@Component({
  selector: 'welight-placeholder-container',
  template: `
    <main
      *ngIf="display"
      [@fadeInOut]
      (@fadeInOut.done)="animationDone($event)"
    >
      <ng-content></ng-content>
    </main>
  `,
  host: {
    class: 'shimmer-placeholder-container',
  },
  animations: [welightShimmerAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelightPlaceholderContainer {
  /** Hide animation is done. */
  public whenHide: Subject<boolean> = new Subject<boolean>();

  /** display placeholder */
  public display = true;

  /** constructor */
  constructor(private cdr: ChangeDetectorRef) {}

  /*---------------------------------------------
   | PRIVATE METHODS
   ---------------------------------------------*/

  /** detect changes */
  private _detectChanges() {
    this.cdr.detectChanges();
  }

  /*---------------------------------------------
   | PUBLIC METHODS
   ---------------------------------------------*/

  /** animation done. */
  public animationDone({ toState }: AnimationEvent): void {
    /** hide animation finish */
    if ('void' === toState) {
      this.whenHide.next(true);
    }
  }

  /** show placeholder container */
  public show(): void {
    this.display = true;
    this._detectChanges();
  }

  /** is show */
  public isDisplaying(): boolean {
    return this.display;
  }

  /** hide placeholder container */
  public hide(): void {
    this.display = false;
    this._detectChanges();
  }

  /** is hide placeholder */
  public isHidden(): boolean {
    return !this.display;
  }
}

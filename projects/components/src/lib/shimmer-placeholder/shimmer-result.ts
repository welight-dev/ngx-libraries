import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { welightShimmerAnimations } from './shimmer-animations';
import { Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'welight-shimmer-result',
  host: {
    class: 'shimmer-result-container',
  },
  template: `
    <main
      *ngIf="display"
      [@fadeInOut]
      (@fadeInOut.done)="animationDone($event)"
    >
      <ng-content></ng-content>
    </main>
  `,
  animations: [welightShimmerAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelightShimmerResult {
  /** display placeholder? */
  public display = false;

  /** Show animation is complete */
  public whenShow: Subject<boolean> = new Subject<boolean>();

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

  /** When animation is done */
  public animationDone({ fromState }: AnimationEvent) {
    if ('void' === fromState) {
      this.whenShow.next(true);
    }
  }

  /** show result container */
  public show(): void {
    this.display = true;
    this._detectChanges();
  }

  /** is show */
  public isDisplaying(): boolean {
    return this.display;
  }

  /** hide result container */
  public hide(): void {
    this.display = false;
    this._detectChanges();
  }

  /** is hide */
  public isHidden(): boolean {
    return !this.display;
  }
}

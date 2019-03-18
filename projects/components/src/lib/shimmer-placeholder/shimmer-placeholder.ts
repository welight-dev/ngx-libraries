import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  OnInit,
  ContentChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';

import * as _ from 'lodash';
import { timer } from 'rxjs';

/** sub components */
import { WelightShimmerResult } from './shimmer-result';
import { WelightPlaceholderContainer } from './placeholder-container';

@Component({
  selector: 'welight-shimmer-placeholder',
  templateUrl: 'shimmer-placeholder.html',
  styleUrls: ['shimmer-placeholder.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WelightShimmerPlaceholder implements OnInit {
  /** One or more URL to preload. */
  @Input() data: string[] | string | Promise<any>;

  /** Force display result when error */
  @Input() forceResult: boolean = false;

  /** When finish preload */
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  /** When finish with success */
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();

  /** When finish with error */
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();

  /** Placeholder container Ref */
  @ContentChild(WelightPlaceholderContainer)
  private placeholderContainer: WelightPlaceholderContainer;

  /** Result container Ref */
  @ContentChild(WelightShimmerResult)
  private resultContainer: WelightShimmerResult;

  /** constructor */
  constructor(private cdr: ChangeDetectorRef) {}

  /*---------------------------------------------
   | LIFECYCLE METHODS
   ---------------------------------------------*/

  /** execute on init component */
  ngOnInit() {
    this._executeProccess();
  }

  /*---------------------------------------------
   | PRIVATE METHODS
   ---------------------------------------------*/

  /** Display result container */
  private _displayResultContainer() {
    // tslint:disable-next-line
    const whenHide = this.placeholderContainer.whenHide.subscribe(hide => {
      if (hide) {
        /** display result container */
        this.resultContainer.show();

        /** detect changes */
        this.cdr.detectChanges();

        /** clear subscribe. */
        whenHide.unsubscribe();
      }
    });

    // hide placeholder.
    if (this._hasUrls) {
      this.placeholderContainer.hide();
    } else {
      const whenTimer = timer(1500).subscribe(null, null, () => {
        this.placeholderContainer.hide();
        whenTimer.unsubscribe();
      });
    }
  }

  /** Execute proccess to preload */
  private async _executeProccess() {
    /** not contains urls */
    if (!this._getUrls.length) {
      /** show result container and hide placeholder container */
      this._displayResultContainer();

      /** stop here. */
      return;
    }

    try {
      let res;

      /** resolve promises */
      if (!this._isPromiseData) {
        res = await Promise.all(this._getPromisesUrls());
      } else {
        res = await this.data;
      }

      /** display result container. */
      this._displayResultContainer();

      /** emit success event */
      this.onSuccess.emit(res);
    } catch (err) {
      /** force display result container on error */
      if (this.forceResult) {
        this._displayResultContainer();
      }

      /** emit error event */
      this.onError.emit(err);
    } finally {
      /** emit complete event */
      this.onComplete.emit(this._getUrls);
    }
  }

  /** Get promises of URLs */
  private _getPromisesUrls(): Promise<string>[] {
    return this._getUrls.map(url => this._preload(url));
  }

  /** Extract URL from style string. Ex. url(https...) */
  private _extractUrl(value: string): string | null {
    /** matches */
    let m;

    if ((m = /url\((.+?)\)/is.exec(value)) !== null) {
      return m[1];
    }

    return value;
  }

  /** Preload url */
  private _preload(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      /** loaded */
      image.onload = () => {
        resolve(url);
      };
      image.src = url;

      if (image.complete) {
        resolve(url);
      }

      /** error on load */
      image.onerror = e => reject(e);
    });
  }

  /*---------------------------------------------
   | PRIVATE GETTER/SETTER ATTRIBUTES
   ---------------------------------------------*/

  /** Data passed is a Promise */
  private get _isPromiseData(): boolean {
    return this.data instanceof Promise;
  }

  /** Has urls to preload */
  private get _hasUrls(): boolean {
    return !!this._getUrls.length;
  }

  /** Get urls */
  private get _getUrls(): string[] {
    if (!this.data) return [];

    let urls: any = this.data;

    /** put into array */
    if (!_.isArray(urls)) {
      // tslint:disable-next-line
      urls = [urls];
    }

    // tslint:disable-next-line
    return urls.map(url => this._extractUrl(url));
  }

  /*---------------------------------------------
   | PUBLIC METHODS
   ---------------------------------------------*/

  /** Display result content. */
  public showResult(): void {
    this.resultContainer.show();
  }

  /** Hide result content. */
  public hideResult(): void {
    this.resultContainer.hide();
  }

  /** Toggle result display state. */
  public toggleResult(): void {
    if (this.resultContainer.isHidden()) {
      this.showResult();
    } else {
      this.hideResult();
    }
  }

  /** Display placeholder. */
  public showPlaceholder(): void {
    this.placeholderContainer.show();
  }

  /** Hide placeholder. */
  public hidePlaceholder(): void {
    this.placeholderContainer.hide();
  }

  /** Toggle placeholder display state. */
  public togglePlaceholder(): void {
    if (this.placeholderContainer.isHidden()) {
      this.showPlaceholder();
    } else {
      this.hidePlaceholder();
    }
  }
}

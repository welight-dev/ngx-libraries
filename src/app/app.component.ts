import { Component, OnInit } from '@angular/core';
import { WelightService } from './welight.service';
import { Ong } from 'welight-api-ts';

@Component({
  selector: 'app-root',
  template: `
    <we-card-ong
      *ngIf="randomOng"
      [ong]="randomOng"
      [isCheckable]="true"
    ></we-card-ong>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  /** ong */
  private _ong: Ong.Ong;

  /** constructor */
  constructor(public welight: WelightService) {}

  /** initialize */
  ngOnInit() {
    this.welight.ong.objects.find();
  }

  /** return ongs. */
  public get ongs(): Array<Ong.Ong> {
    return this.welight.ong.page.objects || [];
  }

  /** random ong */
  public get randomOng(): Ong.Ong {
    // exist ong.
    if (this._ong) {
      return this._ong;
    }

    const ongsLength = this.ongs.length;
    const randomIdx = Math.floor(Math.random() * ongsLength);

    // set ong.
    this._ong = this.ongs[randomIdx];
    return this._ong;
  }
}

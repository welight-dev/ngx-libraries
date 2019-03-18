import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WelightService } from './welight.service';
import { Ong } from '@welight/welight-api-ts';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="ongs.length">
      <welight-card-ong
        *ngFor="let ong of ongs"
        [ong]="ong"
        [isCheckable]="true"
      ></welight-card-ong>
    </ng-container>
  `,
  styles: [
    `
      :host {
        padding: 20px 0;
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 840px;
        margin: 0 auto;
        align-items: flex-start;
      }

      /deep/ welight-card-ong {
        padding: 10px;
      }
    `,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  /** ong */
  private ong: Ong.Ong;

  /** constructor */
  constructor(public welight: WelightService) {}

  /** initialize */
  ngOnInit() {
    this.welight.ong.objects.find({ limit: 0 });
  }

  /** return ongs. */
  public get ongs(): Ong.Ong[] {
    return this.welight.ong.page.objects || [];
  }

  /** random ong */
  public get randomOng(): Ong.Ong {
    // exist ong.
    if (this.ong) {
      return this.ong;
    }

    const ongsLength = this.ongs.length;
    const randomIdx = Math.floor(Math.random() * ongsLength);

    // set ong.
    this.ong = this.ongs[randomIdx];
    return this.ong;
  }
}

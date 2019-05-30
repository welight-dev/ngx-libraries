import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WelightService } from './welight.service';
import { Ong } from '@welight/welight-api-ts';

@Component({
  selector: 'app-root',
  template: `
    <section>
      <h1>Toolbar</h1>
      <we-toolbar
        logo="https://easyimpact-dev.welight.co/assets/welight-logo-backwhite.png"
      ></we-toolbar>
    </section>

    <section>
      <h1>Card</h1>

      <section style="display: inline-flex; flex-direction: row;">
        <ng-container *ngIf="!!randomOng">
          <welight-card-ong
            [ong]="randomOng"
            [isCheckable]="true"
          ></welight-card-ong>
        </ng-container>

        <ng-container *ngIf="!!randomOng">
          <welight-card-ong
            [ong]="randomOng"
            [isCheckable]="true"
            [showButtons]="true"
            [style.margin-left.px]="20"
          >
            <div weCardButtons>
              <button mat-button>+ info</button>
            </div>
          </welight-card-ong>
        </ng-container>
      </section>
    </section>

    <section>
      <h1>Card Style 2</h1>

      <section style="display: inline-flex; flex-direction: row;">
        <ng-container *ngIf="!!randomOng">
          <welight-card-ong
            [ong]="randomOng"
            templateStyle="horizontal"
            [isCheckable]="true"
          ></welight-card-ong>
        </ng-container>

        <ng-container *ngIf="!!randomOng">
          <welight-card-ong
            [ong]="randomOng"
            templateStyle="horizontal"
            [isCheckable]="true"
            [showButtons]="true"
            [style.margin-left.px]="20"
          >
            <div weCardButtons>
              <button mat-button>+ info</button>
            </div>
          </welight-card-ong>
        </ng-container>
      </section>
    </section>
  `,
  styles: [''],
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

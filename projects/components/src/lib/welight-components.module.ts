import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
} from '@angular/material';

/** CARD ONG COMPONENT */
import { WelightCardOng } from './card-ong/card-ong';
import { WelightCardOngButtons } from './card-ong/card-ong-buttons';

/** SHIMMER PLACEHOLDER */
import { WelightShimmerPlaceholder } from './shimmer-placeholder/shimmer-placeholder';
import { WelightPlaceholderContainer } from './shimmer-placeholder/placeholder-container';
import { WelightPlaceholderItem } from './shimmer-placeholder/placeholder-item';
import { WelightShimmerResult } from './shimmer-placeholder/shimmer-result';

/** TOOLBAR */
import { WelightToolbar } from './toolbar/toolbar';
import { WelightComponentsService, ENV_TOKEN } from './welight-components.service';

@NgModule({
  declarations: [
    /** components */
    WelightCardOng,
    WelightCardOngButtons,
    WelightShimmerPlaceholder,
    WelightShimmerResult,
    WelightPlaceholderContainer,
    WelightPlaceholderItem,
    WelightToolbar,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  exports: [
    /** modules */
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    /** card ong component */
    WelightCardOng,
    WelightCardOngButtons,
    /** shimmer placeholder component */
    WelightShimmerPlaceholder,
    WelightShimmerResult,
    WelightPlaceholderContainer,
    WelightPlaceholderItem,
    /** toolbar */
    WelightToolbar,
  ],
  providers: [],
})
export class WelightComponentsModule {
  // tslint:disable-next-line
  static forRoot(env: string = "dev"): ModuleWithProviders {
    return {
      ngModule: WelightComponentsModule,
      providers: [
        WelightComponentsService,
        { provide: ENV_TOKEN, useValue: env },
      ],
    };
  }
}

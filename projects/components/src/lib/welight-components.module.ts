import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
} from '@angular/material';

/** CARD ONG COMPONENT */
import { WelightCardOng } from './card-ong/card-ong';
import { WelightCardOngButtons } from './card-ong/card-ong-buttons';

/** SHIMMER PLACEHOLDER */
import { WelightShimmerPlaceholder } from './shimmer-placeholder/shimmer-placeholder';
import { WelightPlaceholderContainer } from './shimmer-placeholder/placeholder-container';
import { WelightPlaceholderItem } from './shimmer-placeholder/placeholder-item';
import { WelightShimmerResult } from './shimmer-placeholder/shimmer-result';

@NgModule({
  declarations: [
    /** components */
    WelightCardOng,
    WelightCardOngButtons,
    WelightShimmerPlaceholder,
    WelightShimmerResult,
    WelightPlaceholderContainer,
    WelightPlaceholderItem,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    /** modules */
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    /** card ong component */
    WelightCardOng,
    WelightCardOngButtons,
    /** shimmer placeholder component */
    WelightShimmerPlaceholder,
    WelightShimmerResult,
    WelightPlaceholderContainer,
    WelightPlaceholderItem,
  ],
})
export class WelightComponentsModule {}

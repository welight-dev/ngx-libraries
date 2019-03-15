import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
} from '@angular/material';

/** CARD ONG COMPONENT */
import { WeCardOng } from './card-ong/card-ong';
import { WeCardOngButtons } from './card-ong/card-ong-buttons';
import { WePreloadImage } from './card-ong/preload-image';

@NgModule({
  declarations: [
    /** components */
    WeCardOng,
    WeCardOngButtons,
    WePreloadImage,
  ],
  imports: [CommonModule, MatCheckboxModule, MatCardModule, MatButtonModule],
  exports: [
    /** modules */
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    /** components */
    WeCardOng,
    WeCardOngButtons,
  ],
})
export class WeComponentsModule {}

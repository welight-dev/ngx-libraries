import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** lib components */
import { WelightComponentsModule } from 'projects/components/src';
import { WelightService } from './welight.service';

import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    WelightComponentsModule,
  ],
  providers: [WelightService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** lib components */
import { WeComponentsModule } from 'projects/components/src';
import { WelightService } from './welight.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, WeComponentsModule],
  providers: [WelightService],
  bootstrap: [AppComponent],
})
export class AppModule {}

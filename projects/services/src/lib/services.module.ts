import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

/** services */
import {
  WelightService,
  EnvironmentConfig,
  ENVIRONMENT_CONFIG,
} from './welight.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
})
export class WelightServicesModule {
  // tslint:disable-next-line
  static forRoot(config?: EnvironmentConfig): ModuleWithProviders {
    return {
      ngModule: WelightServicesModule,
      providers: [
        WelightService,
        { provide: ENVIRONMENT_CONFIG, useValue: config },
      ],
    };
  }
}

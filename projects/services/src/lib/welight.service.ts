import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Config, Ong } from '@welight/welight-api-ts';
import { Tastypie } from 'ts-resource-tastypie';
import * as _ from 'lodash';

/** interface for received params */
export interface EnvironmentConfig {
  API_ENVIRONMENT: string;
  PRODUCTION: boolean;
}

/** injection token */
export const ENVIRONMENT_CONFIG = new InjectionToken<EnvironmentConfig>(
  'ENV_CONFIG',
);

@Injectable()
export class WelightService {
  /** env */
  public env: EnvironmentConfig;

  /** ong */
  public ong: Tastypie.Resource<Ong.Ong>;

  // tslint:disable-next-line
  constructor(@Inject(ENVIRONMENT_CONFIG) private _env: EnvironmentConfig) {
    /** set environment of api. */
    this._setEnvironment();

    /** set resources */
    this._setResources();
  }

  /** Environment of API. */
  private _setEnvironment(): void {
    // env
    const env = _.isFunction(this._env) ? this._env() : this._env || {};

    /** set api env */
    if (env.API_ENVIRONMENT) {
      Config.Environment.set(env.API_ENVIRONMENT);
    }

    /** set local */
    this.env = env;
  }

  /** set resources */
  private _setResources(): void {
    /** list of resources */
    this.ong = Ong.Ong.resource;
  }

  /** api is loading */
  public get isLoading(): boolean {
    return Tastypie.Working.status;
  }
}

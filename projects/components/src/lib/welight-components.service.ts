import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Config, Ong, DoadorEmpresa } from '@welight/welight-api-ts';
import { Tastypie } from 'ts-resource-tastypie';

/** injection token */
export const ENV_TOKEN = new InjectionToken<string>('ENV');

@Injectable()
export class WelightComponentsService {
  /** empresa */
  public empresa: DoadorEmpresa.Empresa;

  /** ong */
  public ongs: Tastypie.Resource<Ong.Ong>;

  /** analytics */
  public analytics: Tastypie.Resource<DoadorEmpresa.VendaAnalytics>;

  // tslint:disable-next-line
  constructor(@Inject(ENV_TOKEN) private env: string) {
    /** set environment of api. */
    this._setEnvironment();

    /** set resources */
    this._setResources();
  }

  /** environment */
  public getSite(name: string, uri?: string): string {
    return Config.Environment.getDomainSite(name, uri);
  }

  /** Environment of API. */
  private _setEnvironment(): void {
    /** set api env */
    if (this.env) {
      Config.Environment.set(this.env);
    } else {
      Config.Environment.set('dev');
    }
  }

  /** set resources */
  private _setResources(): void {
    /** list of resources */
    this.ongs = Ong.Ong.resource;
    this.analytics = DoadorEmpresa.VendaAnalytics.resource;

    /** list of classes */
    this.empresa = new DoadorEmpresa.Empresa();
  }

  /** api is loading */
  public get isLoading(): boolean {
    return Tastypie.Working.status;
  }
}

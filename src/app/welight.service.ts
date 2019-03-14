import { Ong, Config } from 'welight-api-ts';
import * as api from 'ts-resource-tastypie';

export class WelightService {
  /** ong */
  public ong: api.Tastypie.Resource<Ong.Ong>;

  constructor() {
    this._setupConfig();
    this.ong = Ong.Ong.resource;
  }

  /** setup environment config */
  private _setupConfig() {
    Config.Environment.set('dev');
  }
}

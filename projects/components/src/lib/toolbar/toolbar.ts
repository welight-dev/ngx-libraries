import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { WeAuth, Doador, Config, WeNotify } from '@welight/welight-api-ts';
import * as _ from 'lodash';

@Component({
  selector: 'we-toolbar',
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelightToolbar implements OnInit {
  @Input('logo')
  private logo: string;

  @Input('doador')
  public doador: Doador.Doador;

  @Input('appToken')
  public appToken: string;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!this.doador.we_notify.page.initialized) {
      this._fetchNotifications();
    }
  }

  /** fetch notifications */
  private async _fetchNotifications() {
    await this.doador.we_notify.objects.find({ limit: 4 });
  }

  /** user. */
  public get user() {
    return this.doador.user;
  }

  /** logo src */
  public get logoImage(): string {
    return this.logo || '';
  }

  /** apps */
  public get apps() {
    return this.user.apps.filter(app => app.admin && app.app_token !== this.appToken);
  }

  /** notifications */
  public get notifications() {
    return (this.doador.we_notify.page.objects || []).slice(0, 4);
  }

  /** icon */
  public getNotificationIcon(notification: WeNotify.WeNotifyDoador) {
    const triggerIcon = notification.trigger;
    const triggerIcons = this.doador.we_notify.page.meta.kwargs.icons;

    const icon = triggerIcons.find(i => i.trigger === triggerIcon);

    return !!icon
      ? this.doador.resource.provider.concatDomain(icon.icon)
      : '';
  }

  /** profile image */
  public get profileImage() {
    const { account } = this.user;
    return account.foto;
  }

  /** logout */
  public async logout() {
    await this.user.logout();
    this.redirectTo('home');
  }

  /** redirect to */
  public redirectTo(site, path: string = '/') {
    window.location.href = Config.Environment.getDomainSite(site, path);
  }

  public redirectToSettings() {
    this.router.navigate(['/dashboard/configuracoes']);
  }

  public redirectToApp(app: WeAuth.UserApp) {
    const { auth: { username, api_key } } = this.user;
    const quickLogin = `/quick-login/${username}/${api_key}`;
    this.redirectTo(app.app_token, quickLogin);
  }

  public redirectToNotifications() {
    const { auth: { username, api_key } } = this.user;
    const quickLogin = `/quick-login/${username}/${api_key}/?next=/notificacoes`;
    this.redirectTo('doador', quickLogin);
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  ContentChildren,
  QueryList,
} from '@angular/core';

/** angular material */
import { MatCheckboxChange, MatCheckbox } from '@angular/material';

/** welight lib */
import { Ong } from 'welight-api-ts';
import { WeCardOngButtons } from './card-ong-buttons';

/** Change event object */
export class WeCardOngChange {
  /** event type */
  type: string;
  /** Ong object */
  ong: Ong.Ong;
  /** checkbox is checked */
  checked: boolean;
  /** checkbox ref */
  checkboxRef: MatCheckbox;
  /** payload of event */
  payload: any;
}

@Component({
  selector: 'we-card-ong',
  templateUrl: 'card-ong.html',
  styleUrls: ['card-ong.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeCardOng implements OnInit {
  /** checkbox ref */
  @ViewChild('checkboxRef')
  private checkboxRef: MatCheckbox;

  /** card buttons */
  @ContentChildren(WeCardOngButtons)
  private weCardButtons: QueryList<WeCardOngButtons>;

  /** Display ong title. */
  @Input() showTitle = true;

  /** Display ong description */
  @Input() showDescription = true;

  /** Display checkbox of ong */
  @Input() isCheckable = false;

  /** default checkbox state: `checked` */
  @Input() checked = false;

  /** Display button in bottom of card. */
  @Input() showButtons = false;

  /** Ong. */
  @Input() ong: Ong.Ong;

  /** EventEmitter for changes on card. */
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  /** EventEmitter for checkbox changes. */
  @Output()
  checkboxChange: EventEmitter<any> = new EventEmitter<any>();

  /** ready */
  public ready = false;

  /*---------------------------------------------
   | LIFECYCLE METHODS
   ---------------------------------------------*/

  /** component inits */
  ngOnInit() {
    /** generate exception when `this.ong` is not valid */
    if (!this.ong || !(this.ong instanceof Ong.Ong)) {
      throw new Error(
        'O parâmetro `ong` deve ser informado corretamente no componente `<welight-card-ong>`.',
      );
    }

    /** ready to display */
    this.ready = true;
  }

  /*---------------------------------------------
   | PRIVATE METHODS
   ---------------------------------------------*/

  /** Dispatch changes */
  private _dispatchChanges(type: string, ong: Ong.Ong, payload?: any) {
    const event = new WeCardOngChange();
    event.type = type;
    event.ong = ong;
    event.payload = payload;

    /** dispatch event */
    this.change.emit(event);
  }

  /** Concatenate domain */
  private _concatDomain(value: string): string {
    return Ong.Ong.resource.provider.concatDomain(value);
  }

  /*---------------------------------------------
   | PUBLIC GETTER/SETTER ATTRIBUTES
   ---------------------------------------------*/

  /** Avatar image of Ong. */
  public get ongAvatarImage(): string {
    const image = this.ong.site_custom.img_avatar
      ? this.ong.site_custom.img_avatar
      : this.ong.profile_detail.img_avatar;

    return `url(${this._concatDomain(image)})`;
  }

  /** Background image of Ong. */
  public get ongBackgroundImage(): string {
    const background = this.ong.site_custom.img_fundo
      ? this.ong.site_custom.img_fundo
      : this.ong.profile_detail.img_fundo;

    return `url(${this._concatDomain(background)})`;
  }

  /** Description text of Ong. */
  public get ongDescription(): string {
    const description = this.ong.site_custom.descricao
      ? this.ong.site_custom.descricao
      : this.ong.profile_detail.missao_resumo;

    return description;
  }

  /** Name / Title of Ong. */
  public get ongName(): string {
    return this.ong.nome;
  }

  /** has `[weCardButtons]` */
  public get hasWeCardButtons(): boolean {
    return !!this.weCardButtons.length;
  }

  /*---------------------------------------------
   | PUBLIC METHODS
   ---------------------------------------------*/

  /** Change checkbox ong */
  public onCheckboxChange(matCheckbox: MatCheckboxChange): void {
    const ong = this.ong || null;

    const event = new WeCardOngChange();
    event.type = 'checkboxChange';
    event.ong = ong;
    event.checked = matCheckbox.checked;
    event.checkboxRef = matCheckbox.source;

    /** dispatch event */
    this.checkboxChange.emit(event);
  }
}

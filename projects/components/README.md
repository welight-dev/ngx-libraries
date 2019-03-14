![npm (scoped)](https://img.shields.io/npm/v/@welight/ngx-components.svg)

# Welight Components
> Components for Angular2+ to use in Welight projects.

## Installation

**Step 1**

```npm install @welight/ngx-components```

**Step 2**

Configure `AppModule` to use Welight components.

```typescript
import { WeComponentsModule } from '@welight/ngx-components';

@NgModule({
  imports: [
    // others modules...
    WeComponentsModule
  ]
})
export class AppModule {}
```

## Components

### WeCardOng ```<we-card-ong>```

#### Inputs

| Name | Type | Description |
|:----|:-----:|:-----------:|
| showTitle | boolean | Display name of Ong. |
| showDescription | boolean | Display description of Ong. |
| isCheckable | boolean | Display checkbox into card |
| checked | boolean | Checkbox initial value. |
| showButtons | boolean | Display footer buttons into card. |
| ong | Object\<Ong\> | An object of type Ong with data. |

#### Outputs

| Name | Type | Description |
|:----|:-----:|:-----------:|
| checkboxChange | EventEmitter\<WeCardOngChange\> | When checkbox clicked |

#### Example

<details>
  <summary>HTML Template</summary>

  ```html
  <we-card-ong
    *ngIf="ong"
    [ong]="ong"
    [isCheckable]="true"
    [checked]="true"
    [showDescription]="false"
    (checkboxChange)="changeOng($event)"
  ></we-card-ong>
  ```
</details>

<details>
  <summary>Typescript File</summary>

  ```typescript
  import { WeCardOngChange } from '@welight/ngx-components';

  @Component({
    selector: 'example'
  })
  export class ExampleComponent {
    ong: Ong;

    constructor(private service: WelightService){}

    async ngOnInit() {
      this.ong = await this.service.ongs.objects.find()[0];
    }

    changeOng(event: WeCardOngChange) {
      console.log(event);
    }
  }
  ```
</details>


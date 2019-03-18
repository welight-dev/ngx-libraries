# Welight Components
> Components for Angular to use in Welight projects.

![npm (scoped)](https://img.shields.io/npm/v/@welight/ngx-components.svg)

## Installation

**Step 1**

```npm install @welight/ngx-components```

**Step 2**

Configure `AppModule` to use Welight components.

```typescript
import { WelightComponentsModule } from '@welight/ngx-components';

@NgModule({
  imports: [
    // others modules...
    WelightComponentsModule
  ]
})
export class AppModule {}
```

## Components

### WelightCardOng ```<welight-card-ong>```

#### Inputs

| Name | Type | Description |
|:----|:-----:|:-----------|
| showTitle | boolean | Display name of Ong. |
| showDescription | boolean | Display description of Ong. |
| isCheckable | boolean | Display checkbox into card |
| checked | boolean | Checkbox initial value. |
| showButtons | boolean | Display footer buttons into card. |
| ong | Object\<Ong\> | An object of type Ong with data. |

#### Outputs

| Name | Type | Description |
|:----|:-----:|:-----------|
| checkboxChange | EventEmitter\<WelightCardOngChange\> | When checkbox clicked |

#### Example

[Demo](https://welight-ngx-components.stackblitz.io/card-ong)

> **Note:** To make the best use of the library, install in you project [@welight/welight-api-ts](https://github.com/welight-dev/welight-api-ts).

<details>
  <summary>HTML Template</summary>

  ```html
  <welight-card-ong
    *ngIf="ong"
    [ong]="ong"
    [isCheckable]="true"
    [checked]="true"
    [showDescription]="false"
    (checkboxChange)="changeOng($event)"
  ></welight-card-ong>
  ```
</details>

<details>
  <summary>Typescript File</summary>

  ```javascript
  import { WelightCardOngChange } from '@welight/ngx-components';

  @Component({
    selector: 'example'
  })
  export class ExampleComponent {
    ong: Ong;

    constructor(private service: WelightService){}

    async ngOnInit() {
      this.ong = await this.service.ongs.objects.find()[0];
    }

    changeOng(event: WelightCardOngChange) {
      console.log(event);
    }
  }
  ```
</details>


### WelightShimmerPlaceholder ```<welight-shimmer-placeholder>```

#### Inputs

| Name | Type | Description |
|:----|:-----:|:-----------|
| data | Promise \| string \| string[]  | Array of URLs or Promise to resolve. |
| forceResult | boolean | Force display result when exists error. |

#### Outputs

| Name | Type | Description |
|:----|:-----:|:-----------|
| onComplete | EventEmitter\<any\> | When finish load. |
| onSuccess | EventEmitter\<any\> | When finish load with success. |
| onError | EventEmitter\<any\> | When finish load with error. |

#### Example

[Demo](https://welight-ngx-components.stackblitz.io/shimmer-placeholder)

<details>
  <summary>HTML Template</summary>

  ```html
  <welight-shimmer-placeholder [data]="data">
    <welight-placeholder-container>
      <p wePlaceholderItem height="20px"></p>
    </welight-placeholder-container>

    <welight-shimmer-result>
      <p>Lorem Ipsum...<p>
    </welight-shimmer-result>
  </welight-shimmer-placeholder>
  ```
</details>

<details>
  <summary>Typescript File</summary>

  ```typescript
  @Component({
    selector: 'example'
  })
  export class ExampleComponent {
    data: Promise<any>;

    ngOnInit() {
      this.ong = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
    }
  }
  ```
</details>

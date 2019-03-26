# Welight Services

> Services for Angular to use in Welight projects.

![npm (scoped)](https://img.shields.io/npm/v/@welight/ngx-services.svg)

## Installation

**Step 1**

`npm install @welight/ngx-services`

**Step 2**

Configure `AppModule` to use Welight services.

```typescript
import { WelightServicesModule } from "@welight/ngx-services";

// import environment config
import { environment } from "../environment/environment";

@NgModule({
  imports: [
    // others modules...
    WelightServicesModule.forRoot(environment)
  ]
})
export class AppModule {}
```

## Usage

```typescript
import { Component } from "@angular/core";
import { WelightService } from "@welight/ngx-services";

@Component({
  selector: "example-component"
})
export class ExampleComponent {
  // inject depencie
  constructor(private welight: WelightService) {
    // code here
  }
}
```

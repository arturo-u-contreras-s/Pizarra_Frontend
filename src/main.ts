import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';


import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, { providers: [provideHttpClient()]}).
catch(
  (err) => console.error(err)
);

platformBrowserDynamic().bootstrapModule(AppModule) /* 1. Goes to app.module.ts */
  .catch(err => console.error(err))


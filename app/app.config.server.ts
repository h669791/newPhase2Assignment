// src/app/app.config.server.ts
import { APP_BASE_HREF } from '@angular/common';
import { ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

export const config: ApplicationConfig = {
  providers: [
    ...appConfig.providers,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
};

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { addTokenInterceptor } from './core/interceptors/add-token.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withHashLocation(),
    withInMemoryScrolling({
      scrollPositionRestoration: "enabled"
    }), withViewTransitions()),
  provideClientHydration(withEventReplay())
    , provideHttpClient(withFetch(), withInterceptors([addTokenInterceptor,loadingInterceptor]))
    , importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    CookieService,
  provideToastr(), // Toastr providers


  ]
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled', // vuelve al inicio al navegar
        anchorScrolling: 'enabled',           // soporta links con #
      })
    ),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { 
        dataEncapsulation: false,
        delay: 100
      })
    )
  ]
};

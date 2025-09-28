import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { TodosEffects } from './state/todos.effects';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { todosReducer } from './state/todos.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    provideStore({ todos: todosReducer }),
    provideEffects([TodosEffects])
  ]
};

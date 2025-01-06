import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { authGuardFn } from './auth/guard/auth.gurd';

export const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [authGuardFn] },
  { path: 'auth', component: AuthComponent, canActivate: [authGuardFn] },
  { path: 'home', component: HomeComponent, canActivate: [authGuardFn] },
  {
    path: 'view-article/:id',
    component: ViewArticleComponent,
    canActivate: [authGuardFn],
  },
];

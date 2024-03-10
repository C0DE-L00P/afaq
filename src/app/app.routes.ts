import { UsersComponent } from './pages/dashboard/users/users.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';
import { CanActivateDashboard, CanActivateLogin } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [CanActivateLogin] },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [CanActivateDashboard],
    canActivateChild: [CanActivateDashboard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

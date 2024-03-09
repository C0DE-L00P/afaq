import { UsersComponent } from './pages/dashboard/users/users.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { LayoutComponent } from './pages/dashboard/layout/layout.component';

// TODO apply the guard
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

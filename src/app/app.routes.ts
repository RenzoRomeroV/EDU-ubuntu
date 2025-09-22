import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:module', component: DashboardComponent },
  { path: 'dashboard/:module/:submodule', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];

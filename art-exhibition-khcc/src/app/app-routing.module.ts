import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginEmailComponent } from './components/login-email/login-email.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { MainComponent } from './components/main/main.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login-email',
    component: LoginEmailComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent, canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

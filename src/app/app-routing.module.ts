import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { StreamComponent } from './stream/stream.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-info', component: UserpageComponent, canActivate: [AuthenticationGuard] },
  { path: 'stream', component: StreamComponent, canActivate: [AuthenticationGuard] },
  { path: 'main-page', component: MainPageComponent, canActivate: [AuthenticationGuard] },
  { path: 'stream', component: StreamComponent, canActivate: [AuthenticationGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


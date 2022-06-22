import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RequestTokenComponent } from './request-token/request-token.component';

const routes: Routes = [
  {
		path: '',
		component: HomeComponent,
	},
  {
		path: 'login',
		component: LoginComponent,
	},
  {
		path: 'request-token',
		component: RequestTokenComponent,
	},
	{
		path: 'admin-home',
		component: AdminHomeComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

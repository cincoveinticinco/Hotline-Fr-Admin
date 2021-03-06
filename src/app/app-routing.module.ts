import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { RequestTokenComponent } from './request-token/request-token.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
		path: '',
		component: HomeComponent,
		pathMatch: 'full'
	},
  {
		path: 'login',
		component: LoginComponent,
		pathMatch: 'full'
	},
  {
		path: 'request-token',
		component: RequestTokenComponent,
	},
	{
		path: 'admin-home',
		canActivate: [AuthGuard],
		component: AdminHomeComponent,
	},
	{
		path: 'admin-home/:id',
		canActivate: [AuthGuard],
		component: AdminHomeComponent,
	},
	{
		path: 'projects',
		canActivate: [AuthGuard],
		component: ProjectsComponent,
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

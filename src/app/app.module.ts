import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RequestTokenComponent } from './request-token/request-token.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavTopComponent } from './shared/components/nav-top/nav-top.component';
import { ProjectsComponent } from './projects/projects.component';
import { NullsPipe } from './pipes/nulls.pipe';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddCommentReportComponent } from './components/admin-home/add-comment-report/add-comment-report.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CookieModule } from 'ngx-cookie';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PopupGeneralComponent } from './shared/components/popup-general/popup-general.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		RequestTokenComponent,
		AdminHomeComponent,
		NavTopComponent,
		ProjectsComponent,
		NullsPipe,
		AddProjectComponent,
		AddCommentReportComponent,
		DropdownComponent,
		FooterComponent,
  PopupGeneralComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatSelectModule,
		MatInputModule,
		MatIconModule,
		MatSidenavModule,
		HttpClientModule,
		FormsModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		CookieModule.withOptions()
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

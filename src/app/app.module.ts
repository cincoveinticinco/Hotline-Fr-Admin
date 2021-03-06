import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RequestTokenComponent } from './request-token/request-token.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavTopComponent } from './shared/components/nav-top/nav-top.component';
import { ProjectsComponent } from './projects/projects.component';
import { NullsPipe } from './pipes/nulls.pipe';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddCommentReportComponent } from './components/admin-home/add-comment-report/add-comment-report.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CookieModule } from 'ngx-cookie';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PopupGeneralComponent } from './shared/components/popup-general/popup-general.component';
import { AddIncidentComponent } from './components/admin-home/add-incident/add-incident.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MergeProjectsComponent } from './projects/merge-projects/merge-projects.component';
import { TranslatePipe } from './shared/pipes/translate.pipe';


import localeEs from '@angular/common/locales/es-US';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { LocaleService } from './services/locale.service';


registerLocaleData(localeEs, 'es');
registerLocaleData(localeEn, 'en');
registerLocaleData(localePt, 'pt');

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
  PopupGeneralComponent,
  AddIncidentComponent,
  MergeProjectsComponent,
  TranslatePipe
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
		CookieModule.withOptions(),
		MatCheckboxModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		},
		{
			provide: LOCALE_ID,
			deps: [LocaleService],
			useFactory: (LocaleService: { locale: string; }) => LocaleService.locale
		},
		DatePipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

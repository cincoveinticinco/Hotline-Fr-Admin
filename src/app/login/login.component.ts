import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	formToken: FormGroup = this.fb.group({});
	loading: boolean = false;
	email: string = '';
	newToken: string = '';
	errorResponse: string = '';

	sendToken() {
		this.loading = true;
		let params = {
			'email': this.getEmail()?.value,
			'token': this.formToken.get('token')?.value
		}
		this._lS.getLoginToken(params).subscribe(
			(data: any) => {
				if(data.error) {
					this.errorResponse = 'INVALID TOKEN';
					this.loading = false;
					return;
				}
				this._lS.setToken(data.token);
				let route = JSON.parse(localStorage.getItem('currentUrl') || '""');
				route = route ? route : 'admin-home';
				localStorage.removeItem('currentUrl');
				this.router.navigateByUrl(route);
				this.loading = false;
			}
		);
	}

	sendEmail() {
		this.loading = true;
		this._lS.getEmail(this.getEmail()?.value).subscribe(
			(data: any) => {
				if(data.error) {
					this.loading = false;
					return;
				}
				this.newToken = 'GENERATED TOKEN';
				this.loading = false;
			}
		);
	}

	initFormFields() {
		this.formToken = this.fb.group({
			token: ['', Validators.required],
			email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
		})
	}

	resetMessages() {
		this.newToken = '';
		this.errorResponse = '';
	}

	getSessionStorage() {
		this.email = JSON.parse(sessionStorage.getItem('session_email_hotline') || '""');
		if(this.email) this.getEmail()?.patchValue(this.email);
	}

	getEmail() {
		return this.formToken.get('email');
	}

	constructor(
		private fb: FormBuilder,
		private _lS: LoginService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.initFormFields();
		this.getSessionStorage();
	}
}
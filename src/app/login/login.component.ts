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
	errorEmail: string = '';
	newToken: string = '';
	errorResponse: string = '';

	sendToken() {
		this.loading = true;
		let params = {
			'email': this.email,
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
				this.router.navigate(['admin-home']);
				this.loading = false;
			}
		);
	}

	sendEmail() {
		this.loading = true;
		this._lS.getEmail(this.email).subscribe(
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
			token: ['', Validators.required]
		})
	}

	resetMessages() {
		this.newToken = '';
		this.errorResponse = '';
	}

	getSessionStorage() {
		this.email = JSON.parse(sessionStorage.getItem('session_email_hotline') || '""');
		if(!this.email) this.errorEmail = 'No email has been entered, please go to the previous view to enter the email.';
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
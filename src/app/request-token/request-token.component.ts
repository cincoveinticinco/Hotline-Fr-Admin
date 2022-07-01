import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-request-token',
	templateUrl: './request-token.component.html',
	styleUrls: ['./request-token.component.css']
})
export class RequestTokenComponent implements OnInit {

	formToken: FormGroup;
	errorRequest: string = '';
	loading: boolean = false;
	openToken: boolean = false;

	sendEmail() {
		this.loading = true;
		if (this.formToken.valid) {
			this._lS.getEmail(this.formToken.value.email).subscribe(
				(data: any) => {
					if(data.error) {
						this.errorRequest = data.msg;
						this.loading = false;
						return;
					}
					this.openToken = true;
					this.errorRequest = '';
					this.loading = false;
				}
			);
		}
	}

	sendToken(token: string) {
		this.loading = true;
		let params = {
			'email': this.formToken.value.email,
			'token': token
		}
		this._lS.getLoginToken(params).subscribe(
			(data: any) => {
				if(data.error) {
					this.errorRequest = 'Invalid token';
					this.loading = false;
					return;
				}
				this.errorRequest = '';
				this._lS.setToken(data.token);
				this.router.navigate(['admin-home']);
				this.loading = false;
			}
		);
	}

	get fToken() {
		return this.formToken.controls;
	}


	constructor(private fb: FormBuilder, private router: Router, private _lS: LoginService) {
		this.formToken = this.fb.group({
			email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]))
		})
	}

	ngOnInit(): void {
	}
}

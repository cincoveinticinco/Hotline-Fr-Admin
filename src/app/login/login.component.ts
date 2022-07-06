import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	formToken: FormGroup;
	loading: boolean = false;

	sendToken() {
		this.loading = true;
		let params = {
			'email': this.formToken.value.email,
			'token': null
		}
		this._lS.getLoginToken(params).subscribe(
			(data: any) => {
				if(data.error) {
					this.loading = false;
					return;
				}
				this._lS.setToken(data.token);
				this.router.navigate(['admin-home']);
				this.loading = false;
			}
		);
	}

	get fToken() {
		return this.formToken.controls;
	}

	constructor(private fb: FormBuilder, private _lS: LoginService, private router: Router) {
		this.formToken = this.fb.group({
			token: new FormControl('', Validators.required)
		})
	}

	ngOnInit(): void {
	}
}
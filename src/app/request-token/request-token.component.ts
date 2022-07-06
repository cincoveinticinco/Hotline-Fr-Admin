import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-request-token',
	templateUrl: './request-token.component.html',
	styleUrls: ['./request-token.component.css']
})
export class RequestTokenComponent implements OnInit {

	formEmail: FormGroup = this.fb.group({});
	loading: boolean = false;
	errorResponse: string = '';

	initFormFields() {
		this.formEmail = this.fb.group({
			email: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
		})
	}

	sendEmail() {
		this.loading = true;
		this._lS.getEmail(this.formEmail.get('email')?.value).subscribe(
			(data: any) => {
				if(data.error) {
					this.errorResponse = data.msg;
					this.loading = false;
					return;
				}
				sessionStorage.setItem('session_email_hotline', JSON.stringify(this.formEmail.get('email')?.value));
				this.router.navigate(['login']);
				this.loading = false;
			}
		);
	}


	constructor(
		private fb: FormBuilder,
		private _lS: LoginService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.initFormFields();
	}
}

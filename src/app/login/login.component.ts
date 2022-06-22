import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginHomeService } from '../services/login-services.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	formToken: FormGroup;

	login() {
		if (this.formToken.valid) {
			this.formToken.value.email
			this.loginhomeservice.getToken().subscribe(
				data => {
					console.log(data)
				}
			);
		}
	}



	get fToken() {
		return this.formToken.controls;
	}


	constructor(private fb: FormBuilder, private loginhomeservice: LoginHomeService) {
		this.formToken = this.fb.group({
			token: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]))
		})
	}

	ngOnInit(): void {
	}
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailHomeService } from '../services/service-login.component';

@Component({
	selector: 'app-request-token',
	templateUrl: './request-token.component.html',
	styleUrls: ['./request-token.component.css']
})
export class RequestTokenComponent implements OnInit {

	formToken: FormGroup;

	sendToken() {
		if (this.formToken.valid) {
			this.formToken.value.email
			this.emailhomeservice.getEmail().subscribe(
				data => {
					console.log(data)
				}
			);
		}
	}



	get fToken() {
		return this.formToken.controls;
	}


	constructor(private fb: FormBuilder, private emailhomeservice: EmailHomeService) {
		this.formToken = this.fb.group({
			email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]))
		})
	}

	ngOnInit(): void {
	}
}

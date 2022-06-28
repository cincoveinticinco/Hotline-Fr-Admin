import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
	selector: 'app-request-token',
	templateUrl: './request-token.component.html',
	styleUrls: ['./request-token.component.css']
})
export class RequestTokenComponent implements OnInit {

	formToken: FormGroup;
	errorRequest: string = '';
	loading: boolean = false;

	sendToken() {
		this.loading = true;
		if (this.formToken.valid) {
			this._aS.getEmail(this.formToken.value.email).subscribe(
				(data: any) => {
					if(data.error) {
						this.errorRequest = data.msg;
						this.loading = false;
						return;
					}
					this.router.navigate(['login']);
				}
			);
		}
	}

	get fToken() {
		return this.formToken.controls;
	}


	constructor(private fb: FormBuilder, private _aS: AdminService, private router: Router) {
		this.formToken = this.fb.group({
			email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]))
		})
	}

	ngOnInit(): void {
	}
}

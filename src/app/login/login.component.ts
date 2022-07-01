import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@Output() sendToken = new EventEmitter<string>();

	@Input() error: string = '';

	formToken: FormGroup;

	login() {
		if (this.formToken.valid) {
			this.sendToken.emit(this.formToken.value.token);
		}
	}

	get fToken() {
		return this.formToken.controls;
	}

	constructor(private fb: FormBuilder) {
		this.formToken = this.fb.group({
			token: new FormControl('', Validators.required)
		})
	}

	ngOnInit(): void {
	}
}
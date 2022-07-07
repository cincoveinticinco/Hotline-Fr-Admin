import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

	@Input() project: any;
	@Input() centers: any;

	@Output() closePanel = new EventEmitter<string>();
	@Output() notify = new EventEmitter<string>();

	loading: boolean = false;
	form: FormGroup;

	get aliases() {
		return this.form.get('aliases') as FormArray;
	}

	get users(): string | null {
		return this.form.get('users')?.value;
	}

	get correos() {
		return this.form.get('correos') as FormArray;
	}

	get alias(): string | null {
		return this.form.get('alias')?.value;
	}

	Save() {
		this.loading = true;
		this._aS.addProject(this.form.value).subscribe(
			() => {
				this.loading = false;
				this.notify.emit();
			}
		);
	}

	get fproject() {
		return this.form.controls;
	}

	close() {
		(<FormArray>this.form.get("aliases")).clear();
		(<FormArray>this.form.get("correos")).clear();
		this.closePanel.emit();
	}

	deleteAlias(ev: any) {
		(<FormArray>this.form.get("aliases")).removeAt(ev);
	}
	deleteCorreos(ev: any) {
		(<FormArray>this.form.get("correos")).removeAt(ev);
	}

	addAlias() {
		if(!this.alias) return;
		for (const alias of this.aliases.controls) {
			if(alias.value?.toLowerCase() == this.alias?.toLowerCase()) return;
		}
		(<FormArray>this.form.get("aliases")).push(this.fb.control(this.alias));
		this.form.get("alias")?.patchValue("");
	}

	addCorreos() {
		if(!this.users || this.form.get('users')?.invalid) return;
		for (const correo of this.correos.controls) {
			if(correo.value?.toLowerCase() == this.users?.toLowerCase()) return;
		}
		(<FormArray>this.form.get("correos")).push(this.fb.control(this.users, Validators.required));
		this.form.get("users")?.patchValue("");
	}

	constructor(private _aS: AdminService, private fb: FormBuilder,) {
		this.form = this.fb.group({
			users: new FormControl('', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')),
			center_id: new FormControl(''),
			location_name: new FormControl(''),
			p_name: new FormControl(''),
			p_season: new FormControl(''),
			alias: new FormControl(''),
			p_abbreviation: new FormControl(''),
			aliases: new FormArray([]),
			correos: new FormArray([]),
			id: new FormControl(''),
			company: ''
		})
	}

	fillform() {
		if (this.project) {
			let arrayAlias = this.project.alias ? this.project.alias.split(',') : [];
			let arrayEmails = this.project.users_emails ? this.project.users_emails.split(',') : [];

			this.form.patchValue({
				center_id: this.project.center_id,
				location_name: this.project.location_name,
				p_name: this.project.p_name,
				p_season: this.project.p_season,
				p_abbreviation: this.project.p_abbreviation,
				users: this.project.users,
				id: this.project.id,
				company: this.project.production_company
			})
			arrayAlias.forEach((als: any) => {
				(<FormArray>this.form.get("aliases")).push(this.fb.control(als));
			});
			arrayEmails.forEach((email: any) => {
				(<FormArray>this.form.get("correos")).push(this.fb.control(email));
			});
		}
	}

	ngOnInit(): void {
		this.fillform();
	}

}





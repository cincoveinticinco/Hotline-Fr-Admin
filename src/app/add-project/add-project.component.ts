import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
	@Input() itemact: any;
	@Input() centers: any;
	@Output() closePanel = new EventEmitter<string>();
	@Output() notify = new EventEmitter<string>();

	loading: boolean = false;
	center_id: any[] = [];
	id: any[] = [];
	location_name: any[] = [];
	filters: any = {
		center_id: null,
		location_name: null,

	}
	form: FormGroup;
	project: any = {
		p_name: "",
		p_season: "",
		alias: "",
		p_abbreviation: "",
		aliases: "",
		correos: "",
		users: ""
	}

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
		this.form.reset()

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
		if (this.itemact) {
			let arrayAlias = this.itemact.alias ? this.itemact.alias.split(',') : [];
			let arrayEmails = this.itemact.users_emails ? this.itemact.users_emails.split(',') : [];

			this.form.patchValue({
				center_id: this.itemact.center_id,
				location_name: this.itemact.location_name,
				p_name: this.itemact.p_name,
				p_season: this.itemact.p_season,
				p_abbreviation: this.itemact.p_abbreviation,
				users: this.itemact.users,
				id: this.itemact.id,
				company: this.itemact.company
			})
			arrayAlias.forEach((als: any) => {
				console.log(arrayAlias);
				console.log(als);
				(<FormArray>this.form.get("aliases")).push(this.fb.control(als));
			});
			arrayEmails.forEach((email: any) => {
				(<FormArray>this.form.get("correos")).push(this.fb.control(email));
			});
		}
	}

	ngOnInit(): void {
		console.log(this.itemact);
		this.fillform();
	}

}





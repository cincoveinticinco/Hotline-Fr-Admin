import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
	@Input() itemact: any;
	@Output() closePanel = new EventEmitter<string>();
	@Output() notify = new EventEmitter<string>();

	loading: boolean = true;
	center_id: any[] = [];
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
		correos: ""
	}

	/* 	profileForm = this.fb.group({
			aliases: this.fb.array([
				this.fb.control('')
			])
		});
	 */
	get aliases() {
		return this.form.get('aliases') as FormArray;
	}
	get correos() {
		return this.form.get('correos') as FormArray;
	}


	Save() {
		console.log(this.form.get("aliases"))
		console.log(this.form.get("correos"))
		console.log(this.form)
		this._aS.addProject(this.form.value).subscribe(
			data => {
				console.log(data)
				this.form.reset()
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
		this.project.alias.splice(ev, 1);
	}
	deleteCorreos(ev: any) {
		this.project.correo.splice(ev, 1);
	}

	addAlias() {
		(<FormArray>this.form.get("aliases")).push(this.fb.control(this.alias))
	}

	get alias(): string | null {
		return this.form.get('alias')?.value;
	}

	addCorreos() {
		(<FormArray>this.form.get("correos")).push(this.fb.control(this.users, Validators.required))
	}
	get users(): string | null {
		return this.form.get('users')?.value;
	}





	constructor(private _aS: AdminService, private fb: FormBuilder,) {
		this.form = this.fb.group({
			users: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
			center_id: new FormControl(''),
			location_name: new FormControl(''),
			p_name: new FormControl(''),
			p_season: new FormControl(''),
			alias: new FormControl(''),
			p_abbreviation: new FormControl(''),
			aliases: new FormArray([]),
			correos: new FormArray([])



		})
	}
	fillform() {
		if (this.itemact) {
			this.form.patchValue({
				center_id: this.itemact.center_id,
				location_name: this.itemact.location_name,
				p_name: this.itemact.p_name,
				p_season: this.itemact.p_season,
				alias: this.itemact.alias,
				p_abbreviation: this.itemact.p_abbreviation,
				aliases: this.itemact.aliases,
				correos: this.itemact.correos
			})
		}

	}

	ngOnInit(): void {
		this.fillform()
		this.form.reset()
		console.log(this.itemact)
		this.loading = true;
		this._aS.getListProjects().subscribe(
			(data: any) => {
				console.log(data);
				this.center_id = data.centers && data.centers.length ? data.centers : [];
				this.location_name = data.locations && data.locations.length ? data.locations : [];
				this.loading = false;
			}
		)
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['itemact']) {
			this.fillform()
		}
	}

}





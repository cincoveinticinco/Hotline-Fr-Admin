import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
		p_abbreviation: ""
	}

	addAlias() {

	}

	Save() {
		console.log(this.form)

		this.form.value.users
		this.form.value.p_name
		this.form.value.p_season
		this.form.value.alias
		this.form.value.p_abbreviation
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
		this.closePanel.emit();
	}

	/* 	deleteAlias(ev: any) {
			this.project.alias.splice(ev, 1);
		}
	
		addAlias() {
			var a: any = {
				'alias': '',
			}
			this.project.alias.push(a)
		} */

	constructor(private _aS: AdminService, private fb: FormBuilder,) {
		this.form = this.fb.group({
			users: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
			center_id: new FormControl(''),
			location_name: new FormControl(''),
			p_name: new FormControl(''),
			p_season: new FormControl(''),
			alias: new FormControl(''),
			p_abbreviation: new FormControl('')


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
				p_abbreviation: this.itemact.p_abbreviation
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





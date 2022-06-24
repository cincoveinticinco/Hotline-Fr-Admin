import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  centers: any[] = [];
  locations: any[] = [];
  filters: any = {
    centers: null,
    locations: null,
  }
  form: FormGroup;

  Save() {
		if (this.form.valid) {
			this.form.value.email
			this._aS.addProject().subscribe(
				data => {
					console.log(data)
				}
			);
		}
	}

	get fproject() {
		return this.form.controls;
	}


  addProject(){ 
    this.loading = true;
    this._aS.addProject().subscribe(
      (data: any) => {  
        console.log(data);
        this.loading = false;
        this.notify.emit();
      }
    )
  }

  close() {
    this.closePanel.emit();
  }

  constructor(private _aS: AdminService, private fb: FormBuilder,) { 
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      centers: new FormControl(''),
      locations: new FormControl('')		
    })
  }

  ngOnInit(): void {
    console.log(this.itemact)
    this.loading = true;
    this._aS.getListProjects().subscribe(
      (data: any) => {  
        console.log(data);
        this.centers = data.centers && data.centers.length ? data.centers : [];
        this.locations = data.locations && data.locations.length ? data.locations : [];
        this.loading = false;
      }
    )
  }

}

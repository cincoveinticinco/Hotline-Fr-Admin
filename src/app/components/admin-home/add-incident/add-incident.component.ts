import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  @Input() incident: any = null;

  @Output() closePanel = new EventEmitter<string>();

  loading: boolean = false;
  form: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initFormFields();
  }

  close() {
    this.closePanel.emit();
  }

  initFormFields() {
		this.form = this.fb.group({
			'reporter': [null, Validators.required],
      'send_emails': [ false, Validators.required]
		});
	}

  onSubmit() {
    console.log('enviado');
    console.log(this.form);
    console.log(this.form.get('send_emails')?.value);
  }

}

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  @Input() incident: any = null;

  @Output() closePanel = new EventEmitter<string>();
  @Output() notify = new EventEmitter<string>();

  loading: boolean = false;
  form: FormGroup = this.fb.group({});
  today: string | null = '';
  answersForm: any[] = [];
  optionsPositionOnProduction: any[] = [
    { id: 3, answer_text:'CURRENT PRODUCTION STAFF OR CREW', question_id: 9 },
    { id: 4, answer_text: 'FORMER PRODUCTION STAFF OR CREW', question_id: 9 },
    { id: 5, answer_text: 'CURRENT CAST, EXTRA OR STUNT', question_id: 9 },
    { id: 6, answer_text: 'FORMER CAST, EXTRA OR STUNT', question_id: 9 },
    { id: 7, answer_text: 'CURRENT VENDOR, CONTRACTOR OR SERVICE PROVIDER', question_id: 9 },
    { id: 8, answer_text: 'FORMER VENDOR, CONTRACTOR OR SERVICE PROVIDER', question_id: 9 },
    { id: 9, answer_text: 'OTHER', question_id: 9 },
  ];
  optionsType: any[] = [
    { id: 10, answer_text: 'SEXUAL HARASSMENT', question_id: 10 },
    { id: 11, answer_text: 'DISCRIMINATION', question_id: 10 },
    { id: 12, answer_text: 'VIOLENCE', question_id: 10 },
    { id: 13, answer_text: 'SAFETY / SECURITY', question_id: 10 },
    { id: 14, answer_text: 'RETALIATION', question_id: 10 },
    { id: 16, answer_text: 'MINORS', question_id: 10 },
    { id: 17, answer_text: 'HOSTILE WORK ENVIRONMENT', question_id: 10 },
    { id: 18, answer_text: 'BULLYING / INTIMIDATION', question_id: 10 },
    { id: 19, answer_text: 'ALL OTHERS', question_id: 10 },
  ];
  optionsCoutry: any[] = [
    { id: 1, code: '+49', country: 'Germany' },
    { id: 2, code: '+54', country: 'Argentina' },
    { id: 3, code: '+61', country: 'Australia' },
    { id: 4, code: '+591', country: 'Bolivia' },
    { id: 5, code: '+55', country: 'Brazil' },
    { id: 6, code: '+1', country: 'Canada' },
    { id: 7, code: '+56', country: 'Chile' },
    { id: 8, code: '+86', country: 'China' },
    { id: 9, code: '+57', country: 'Colombia' },
    { id: 10, code: '+506', country: 'Costa Rica' },
    { id: 11, code: '+53', country: 'Cuba' },
    { id: 12, code: '+593', country: 'Ecuador' },
    { id: 13, code: '+503', country: 'El Salvador' },
    { id: 14, code: '+34', country: 'Spain' },
    { id: 15, code: '+1', country: 'United States' },
    { id: 16, code: '+33', country: 'France' },
    { id: 17, code: '+502', country: 'Guatemala' },
    { id: 18, code: '+504', country: 'Honduras' },
    { id: 19, code: '+91', country: 'India' },
    { id: 20, code: '+39', country: 'Italy' },
    { id: 21, code: '+81', country: 'Japan' },
    { id: 22, code: '+52', country: 'Mexico' },
    { id: 23, code: '+505', country: 'Nicaragua' },
    { id: 24, code: '+507', country: 'Panama' },
    { id: 25, code: '+595', country: 'Paraguay' },
    { id: 26, code: '+51', country: 'Peru' },
    { id: 27, code: '+351', country: 'Portugal' },
    { id: 28, code: '+44', country: 'United Kingdom' },
    { id: 29, code: '+7', country: 'Russia' },
    { id: 30, code: '+41', country: 'Switzerland' },
    { id: 31, code: '+598', country: 'Uruguay' },
    { id: 32, code: '+58', country: 'Venezuela' },
  ];

  constructor(
    private fb: FormBuilder,
    private datePipe:DatePipe,
    private _aS: AdminService
  ) { }

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'y-MM-dd');
    this.initFormFields();
  }

  close() {
    this.closePanel.emit();
  }

  initFormFields() {
		this.form = this.fb.group({
			'reporter': [null, Validators.required],
      'send_emails': null,
      'email': ['', Validators.email],
      'confirm_email': ['', Validators.email],
      'postion_on_production': [null, Validators.required],
      'first_name': '',
      'last_name': '',
      'country': '',
      'phone_number': null,
      'type': [null, Validators.required],
      'production': ['', Validators.required],
      'season': null,
      'description': ['', Validators.required],
      'people_involved': ['', Validators.required],
      'date': [null, Validators.required],
      'location': ['', Validators.required],
      'more_once': [null, Validators.required],
      'more_once_detail': '',
      'discussed_supervisor': [null, Validators.required],
      'who_report': ''
		});
	}

  getControlValue(formControlName: string) {
    return this.form.get(formControlName)?.value;
  }

  onSubmit() {
    this.loading = true;
    this.validateAnswers();
    this._aS.saveIncident(this.answersForm).subscribe(
      () => {
        this.loading = false;
        this.notify.emit();
      }
    )
  }

  validateAnswers() {
    this.generateAnswer(3, this.getControlValue('reporter'), null, null);
    if(this.getControlValue('reporter') == 1) this.generateAnswer(4, null, null, this.getControlValue('send_emails'));
    if(this.getControlValue('send_emails') == true || this.getControlValue('reporter') == 2) this.generateAnswer(5, null, this.getControlValue('email'), null);
    if(this.getControlValue('reporter') == 2) {
      this.generateAnswer(7, null, this.getControlValue('first_name'), null);
      this.generateAnswer(8, null, this.getControlValue('last_name'), null);
      this.generateAnswer(6, null, this.getControlValue('country') + this.getControlValue('phone_number'), null);
    }
    this.generateAnswer(9, this.getControlValue('postion_on_production'), null, null);
    this.generateAnswer(10, this.getControlValue('type'), null, null);
    this.generateAnswer(11, null, this.getControlValue('production'), null);
    if(this.getControlValue('season') != '') this.generateAnswer(12, null, this.getControlValue('season'), null);
    this.generateAnswer(13, null, this.getControlValue('description'), null);
    this.generateAnswer(14, null, this.getControlValue('people_involved'), null);
    this.generateAnswer(15, null, this.getControlValue('date'), null);
    this.generateAnswer(16, null, this.getControlValue('location'), null);
    this.generateAnswer(17, null, this.getControlValue('more_once_detail'), this.getControlValue('more_once'));
    this.generateAnswer(18, null, this.getControlValue('who_report'), this.getControlValue('discussed_supervisor'));
  }

  generateAnswer(questionId: number, optionId: number | null, answer: string | null, yesOrNot: boolean | null) {
    const answerRequest = {
      'question_id': questionId,
      'q_option_id': optionId,
      'answer': answer || null,
      'a_yes_or_no': yesOrNot,
    }
    this.answersForm.push(answerRequest);
  }

  /* validateControl(controlName: string, condition: boolean) {
    if(condition) {
      this.form.get(controlName)?.addValidators(Validators.required);
      if(controlName == 'email') {
        this.form.get('confirm_email')?.addValidators([Validators.required, this.validateEmails()]);
      }
    }else {
      this.form.get(controlName)?.removeValidators(Validators.required);
      if(controlName == 'email') {
        this.form.get('confirm_email')?.removeValidators([Validators.required, this.validateEmails()]);
      }
    }
    this.form.get(controlName)?.updateValueAndValidity();
  } */

  /* validateEmails(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.getControlValue('email')?.toLowerCase() != this.getControlValue('confirm_email')?.toLowerCase() ? {forbiddenName: {value: control.value}} : null;
    };
  } */

  validateForm(): boolean {
    if(this.getControlValue('reporter') == 1) if(this.getControlValue('send_emails') == null) return true;
    if(this.getControlValue('send_emails') == true) if(this.getControlValue('email') == '' || this.getControlValue('email')?.toLowerCase() != this.getControlValue('confirm_email')?.toLowerCase()) return true;
    if(this.getControlValue('reporter') == 2) {
      if(this.getControlValue('first_name') == '') return true;
      if(this.getControlValue('last_name') == '') return true;
      if(this.getControlValue('country') == '') return true;
      if(this.getControlValue('phone_number') == null) return true;
      if(this.getControlValue('email') == '') return true;
    }
    if(this.getControlValue('more_once') == true) if(this.getControlValue('more_once_detail') == '') return true;
    if(this.getControlValue('discussed_supervisor') == true) if(this.getControlValue('who_report') == '') return true;
    return false
  }

}

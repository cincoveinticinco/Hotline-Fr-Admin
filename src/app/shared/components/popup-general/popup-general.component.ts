import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-general',
  templateUrl: './popup-general.component.html',
  styleUrls: ['./popup-general.component.css']
})
export class PopupGeneralComponent implements OnInit {

  @Input() title: string = '';
	@Input() type: 'confirmation' = 'confirmation';
	@Input() item: string | number = '';
	@Input() message: string = '';
  @Input() cancelText: string = 'Cancel';
	@Input() confirmText: string = 'Confirm';

  @Output() closePopup = new EventEmitter<string>();
	@Output() confirmPopup = new EventEmitter<string>();
	@Output() cancelPopup = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  closeContainer() {
    this.closePopup.emit();
  }

  confirm() {
    this.confirmPopup.emit();
  }

  close() {
    this.closePopup.emit();
  }

}

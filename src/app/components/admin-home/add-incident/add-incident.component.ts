import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  @Input() incident: any = null;

  @Output() closePanel = new EventEmitter<string>();

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closePanel.emit();
  }

}

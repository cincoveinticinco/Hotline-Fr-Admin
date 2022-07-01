import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {

  @Output() closePanel = new EventEmitter<string>();

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closePanel.emit();
  }

}

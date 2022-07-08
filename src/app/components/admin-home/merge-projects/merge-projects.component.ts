import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-merge-projects',
  templateUrl: './merge-projects.component.html',
  styleUrls: ['./merge-projects.component.css']
})
export class MergeProjectsComponent implements OnInit {

  @Output() closePanel = new EventEmitter<string>();

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closePanel.emit();
  }

}

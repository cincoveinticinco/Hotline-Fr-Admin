import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-merge-projects',
  templateUrl: './merge-projects.component.html',
  styleUrls: ['./merge-projects.component.css']
})
export class MergeProjectsComponent implements OnInit {

  @Input() project: any = null;
  @Input() listProjects: any[] = [];

  @Output() closePanel = new EventEmitter<string>();

  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closePanel.emit();
  }

}

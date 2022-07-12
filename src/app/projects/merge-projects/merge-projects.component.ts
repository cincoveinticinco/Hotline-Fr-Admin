import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-merge-projects',
  templateUrl: './merge-projects.component.html',
  styleUrls: ['./merge-projects.component.css']
})
export class MergeProjectsComponent implements OnInit {

  @Input() project: any = null;
  @Input() listProjects: any[] = [];

  @Output() closePanel = new EventEmitter<string>();
  @Output() notify = new EventEmitter<string>();

  loading: boolean = false;
  mergeProject: any = null;

  constructor(
    private _aS: AdminService
  ) { }

  ngOnInit(): void {
    this.listProjects = this.listProjects.filter(project => project.id != this.project.id);
  }

  close() {
    this.closePanel.emit();
  }

  submitForm() {
    this.loading = true;
    this._aS.mergeProjects(this.project.id, this.mergeProject.id).subscribe(
      () => {
        this.notify.emit();
        this.loading = false;
      }
    )
  }

}

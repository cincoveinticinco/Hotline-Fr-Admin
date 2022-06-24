import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-comment-report',
  templateUrl: './add-comment-report.component.html',
  styleUrls: ['./add-comment-report.component.css']
})
export class AddCommentReportComponent implements OnInit {

  @Output() closePanel = new EventEmitter<string>();

  heightTextarea: number = 15;
  isOpenTexarea: boolean = false;
  report: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closePanel.emit();
  }

  toggleTextarea(open: boolean = false) {
    this.isOpenTexarea = open ? true : !this.isOpenTexarea;
    this.heightTextarea = this.isOpenTexarea ? 100 : 15;
  }

}

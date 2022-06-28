import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-comment-report',
  templateUrl: './add-comment-report.component.html',
  styleUrls: ['./add-comment-report.component.css']
})
export class AddCommentReportComponent implements OnInit {

  @Input() report: any = null;

  @Output() closePanel = new EventEmitter<string>();
  @Output() notify = new EventEmitter<string>();

  heightTextarea: number = 15;
  isOpenTexarea: boolean = false;
  response: string = '';
  loading: boolean = true;

  constructor(
    private _aS: AdminService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.response = '';
    this.closePanel.emit();
  }

  toggleTextarea(open: boolean = false) {
    this.isOpenTexarea = open ? true : !this.isOpenTexarea;
    this.heightTextarea = this.isOpenTexarea ? 100 : 15;
  }

  saveReply(isClose: boolean) {
    this.loading = true;
    let params = {
      reportId: this.report.report.id,
      replyTxt: this.response,
      toClose: isClose,
    }
    this._aS.createReply(params).subscribe(
      (data: any) => {
        this.response = '';
        this.notify.emit();
        this.loading = false;
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
		if (changes['report']) {
      this.loading = this.report ? false : true;
		}
	}

  getQuestion(id:number) {
    let text: string = '';
    this.report.answers.forEach((rpt: any) => {
      if(rpt.question_id == id) text = rpt.answer_text ? rpt.answer_text : '-';
    });
    return text;
  }

}

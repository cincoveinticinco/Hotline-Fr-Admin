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
  @Output() update = new EventEmitter<string>();

  heightTextarea: number = 30;
  isOpenTexarea: boolean = false;
  response: string = '';
  loading: boolean = true;
  selectedResponse: any = null;
  errorResponse: string = '';

  constructor(
    private _aS: AdminService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
		if (changes['report']) {
      this.loading = this.report ? false : true;
		}
	}

  close() {
    this.closePanel.emit();
  }

  toggleTextarea(open: boolean = false) {
    this.isOpenTexarea = open ? true : !this.isOpenTexarea;
    this.heightTextarea = this.isOpenTexarea ? 100 : 30;
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

  saveResponse() {
    this.loading = true;
    let params = {
      replyId: this.selectedResponse.id,
      replyTxt: this.selectedResponse.reply_txt,
    }
    this._aS.createResponseReply(params).subscribe(
      (data: any) => {
        this.update.emit();
        this.selectedResponse = null;
        this.loading = false;
      },
      err => {
        this.selectedResponse = null;
        this.loading = false;
      }
    );
  }

  getQuestion(id:number) {
    let text: string = '';
    this.report.answers.forEach((rpt: any) => {
      if(rpt.question_id == id) text = rpt.answer_text ? rpt.answer_text : '-';
    });
    return text;
  }

  selectResponse(newResponse: any) {
    this.selectedResponse = newResponse;
  }

}

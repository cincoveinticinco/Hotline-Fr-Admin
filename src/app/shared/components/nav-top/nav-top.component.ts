import { Component, OnInit } from '@angular/core';
import { LocaleService } from 'src/app/services/locale.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {

  constructor(
    private _lS: LoginService,
    public _locS: LocaleService
  ) { }

  ngOnInit(): void {
  }

  closeSession() {
    this._lS.logOut();
  }

}

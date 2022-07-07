import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public service_url: string = environment.apiUrl;

  constructor(
    private _lS: LoginService
  ) { }

  ngOnInit(): void {
    this._lS.removeCookies();
  }

}

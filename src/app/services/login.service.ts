import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminService } from './admin.service';

//import { Storage } from '@capacitor/storage'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public frontUrl: string = environment.frontUrl;

  constructor(
    private _cookieService: CookieService,
    private http: HttpClient,
		private _aS : AdminService
  ) { }

  /* private async setToken(token: string) {
    await Storage.set({ key: 'owsession', value: token })
  } */

  getToken() {
    const value = this._cookieService.get('hotline')
    return value
  }

	setToken() {
		
	}

  getIsLoggedIn() {
		return this.getToken() ? true : false;
	}

  logOut() {
		this.removeCookies();
		window.location.href = this.frontUrl;
	}

  removeCookies() {
		this._cookieService.remove('hotline');
		localStorage.clear();
		sessionStorage.clear();
	}

	setRedirecUrl(state: RouterStateSnapshot) {
		let previousUrl = JSON.parse(localStorage.getItem('currentUrl')!);
		let savedPreviousUrl = previousUrl != state.url ? previousUrl : null;
		localStorage.setItem('previousUrl', JSON.stringify(savedPreviousUrl));
		localStorage.setItem('currentUrl', JSON.stringify(state.url));
	}

  getEmail(email: string) {
		let params = {
			'email': email
		};
		return this.http.post(this._aS.service_url + 'login/sendToken', params, this._aS.httpOptions).pipe(
			map((response: any) => response))
	}

	getLoginToken(requestParams: any) {
		let params = {
			'email': requestParams.email,
			'token': requestParams.token
		};
		return this.http.post(this._aS.service_url + 'login/loginToken', params, this._aS.httpOptions).pipe(
			map((response: any) => response))
	}


}

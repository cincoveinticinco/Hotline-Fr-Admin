import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private _lS: LoginService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		const loggedIn = this._lS.getIsLoggedIn();
		if (!loggedIn) {
			this._lS.setRedirecUrl(state);
			this._lS.logOut();
		}
		return loggedIn;
	}

}

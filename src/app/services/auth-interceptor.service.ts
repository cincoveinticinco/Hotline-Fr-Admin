import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, tap, throwError } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _lS: LoginService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handler(req, next))
  }

  handler(req: HttpRequest<any>, next: HttpHandler) {

    const hotlineSession = this._lS.getToken();
		let request = req;

		if (hotlineSession) {
			request = req.clone({
				setHeaders: {
					'Authorization': hotlineSession,
				}
			});
    }

		return next.handle(request).pipe(
			tap(event => {
				if (event instanceof HttpResponse) {
					if (event.body) {
						if (event.body.session === false) {
							this._lS.logOut();
						}
					}
				}

			}),
			catchError((err: HttpErrorResponse) => {

				if (err.status === 401) {
					this._lS.logOut();
				}

				return throwError(() => err);

			}));
  }
}

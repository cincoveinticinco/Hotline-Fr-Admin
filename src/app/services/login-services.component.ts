import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class LoginHomeService {
	constructor(private http: HttpClient) { }

	getToken() {
		return this.http.post(`${environment.token}`, {
		})
			.pipe(
				map((response: any) => {
					return response;
				})
			)
	}

}

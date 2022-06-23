import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: 'root'
})
export class EmailHomeService {
	constructor(private http: HttpClient) { }

	getEmail() {
		return this.http.post(`${environment.email}`, {
		})
			.pipe(
				map((response: any) => {
					return response;
				})
			)
	}

}

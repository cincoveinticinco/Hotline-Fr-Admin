import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private languages: any[] = [];
  public service_url: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getLanguages() {
    return this.languages;
  }

  getListReports() {
		return this.http.get(this.service_url + 'admin/listReports');
	}

  getListProjects(){
		return this.http.get(this.service_url + 'admin/getProjects');
  }

  addProject(){
		return this.http.post(this.service_url + 'admin/newProject', '')
			.pipe(
				map((response: any) => {
					return response;
				})
			)
	}
}

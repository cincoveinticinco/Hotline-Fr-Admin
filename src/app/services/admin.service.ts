import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

}

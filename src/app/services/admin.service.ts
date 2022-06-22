import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private languages: any[] = [];

  constructor() { }

  getLanguages() {
    return this.languages;
  }
}

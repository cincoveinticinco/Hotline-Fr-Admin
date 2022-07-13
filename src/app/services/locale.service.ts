import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  readonly DEFAULT_LANGUAGE = 'en';
  languages: any[] = [
    {
      'name': 'en',
      'img': '../../assets/img/english.svg.png'
    },
    {
      'name': 'es',
      'img': '../../assets/img/spanish.png'
    },
    {
      'name': 'pt',
      'img': '../../assets/img/brasilian.png'
    },
  ];

  constructor() { }

  set locale(value: string) {
		localStorage.setItem('hotline_loc', JSON.stringify(value));
	}
	get locale(): string {
		return this.getLanguage() || this.DEFAULT_LANGUAGE;
	}

  getLanguage(): string {
    const loc = localStorage.getItem('hotline_loc');
    return loc ? JSON.parse(loc) : this.DEFAULT_LANGUAGE;
  }

  setLanguage(language: string) {
    localStorage.setItem('hotline_loc', JSON.stringify(language));
    location.reload();
  }
}

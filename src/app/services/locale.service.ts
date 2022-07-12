import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private language: string = 'es';
  readonly DEFAULT_LANGUAGE = 'es';
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
      'name': 'po',
      'img': '../../assets/img/brasilian.png'
    },
  ];

  constructor() { }

  set locale(value: string) {
		this.language = value;
	}
	get locale(): string {
		return this.language || this.DEFAULT_LANGUAGE;
	}
}

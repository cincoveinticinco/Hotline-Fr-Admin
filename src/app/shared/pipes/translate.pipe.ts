import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from 'src/app/services/locale.service';
import { TRANSLATE_ESP } from '../consts/translate_esp';
import { TRANSLATE_PT } from '../consts/translate_pt';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(public _loc: LocaleService) {}

  transform(value: string): string {

    if (typeof value !== 'string' || value === undefined || value === null) return value;

		let foundValue = '';
		let language = this._loc.locale;

		switch (language) {
      case 'es':
        foundValue = TRANSLATE_ESP[value.toLowerCase()];
        break;
      case 'pt':
        foundValue = TRANSLATE_PT[value.toLowerCase()];
        break;
      default:
        break;
    }

    return foundValue ? foundValue : value;
  }

}

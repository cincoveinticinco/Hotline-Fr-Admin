import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nulls'
})
export class NullsPipe implements PipeTransform {

  transform(value:any): string {
    if(value === null)
    return  "-----"
    else 
    return value
  }


}

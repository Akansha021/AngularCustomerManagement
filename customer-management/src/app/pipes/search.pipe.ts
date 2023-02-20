import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:any, keys: string, term: string,colName: any="firstName"): any {
    if (!value) return null;
   
    if (!term) {
      return value
  }
  let res = (value || []).filter((item:any) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  return res.length ? res : [-1];
  }

}

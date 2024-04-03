import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpperCase'
})
export class FirstLetterUpperCasePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    return value.replace(value.charAt(0), value.charAt(0).toLocaleUpperCase());
  }

}

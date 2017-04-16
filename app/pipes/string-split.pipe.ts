import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'stringSplit' })
export class StringSplitPipe implements PipeTransform {
  transform(str:string ,exponent: string):any {
    return str.split(exponent);
  }
}
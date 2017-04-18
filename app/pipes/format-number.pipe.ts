import { Pipe , PipeTransform } from '@angular/core';

/**
 * eq: {{123213.88888| formatNumber:','}}
 *     return 123,213.888,88
 */

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform{
  transform(value:any='' , exponent:string=','):string {
    value += '';
    let arrValue = value.split('.');
    return this.format(arrValue[0] , exponent)+(arrValue[1] ? '.'+this.format(arrValue[1] , exponent) : '');
  }

  format(source:string , exponent:string):string{
    let formatStr = '';
    for ( let i = 0 ; i < source.length ; i++ ){
      formatStr += source[i];
      if ( (i+1)%3 === 0 && (i+1) !== source.length ) {
        formatStr += exponent;
      }
    }
    return formatStr;
  }
}
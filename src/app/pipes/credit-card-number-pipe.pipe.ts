import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCardNumberPipe',
})
export class CreditCardNumberPipePipe implements PipeTransform {
  transform(value: string): string {
    value = value ? value.replace(/\-/g, '') : '';

    return value && value.length % 4 === 0
      ? value.match(/.{4}/g).join('-')
      : value;
  }
}

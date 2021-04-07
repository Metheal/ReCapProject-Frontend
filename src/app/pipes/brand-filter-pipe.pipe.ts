import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'brandFilterPipe',
})
export class BrandFilterPipePipe implements PipeTransform {
  transform(value: CarDto[], filterText: string): CarDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: CarDto) =>
            c.carName?.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}

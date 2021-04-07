import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'colorFilterPipe',
})
export class ColorFilterPipePipe implements PipeTransform {
  transform(value: CarDto[], filterText: string): CarDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (c: CarDto) =>
            c.colorName?.toLocaleLowerCase().indexOf(filterText) === 0
        )
      : value;
  }
}

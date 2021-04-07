import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../models/carDto';

@Pipe({
  name: 'carFilterPipe',
})
export class CarFilterPipePipe implements PipeTransform {
  transform(
    value: CarDto[],
    filterText: string,
    color: string,
    brand: string
  ): CarDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    color = color ? color.toLocaleLowerCase() : '';
    brand = brand ? brand.toLocaleLowerCase() : '';
    return filterText || color || brand
      ? value.filter(
          (c: CarDto) =>
            c.carName?.toLocaleLowerCase().indexOf(filterText) !== -1 &&
            c.colorName?.toLocaleLowerCase().indexOf(color) !== -1 &&
            c.brandName?.toLocaleLowerCase().indexOf(brand) !== -1
        )
      : value;
  }
}

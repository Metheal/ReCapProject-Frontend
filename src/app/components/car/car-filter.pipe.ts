import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';

@Pipe({
  name: 'carFilter',
})
export class CarFilterPipe implements PipeTransform {
  // transform(value: CarDto[], filterText: string): CarDto[] {
  //   filterText = filterText ? filterText.toLocaleLowerCase() : '';
  //   return filterText
  //     ? value.filter(
  //         (c: CarDto) =>
  //           c.carName?.toLocaleLowerCase().indexOf(filterText) !== -1
  //       )
  //     : value;
  // }

  transform(value: CarDto[], params: string): CarDto[] {
    if (!params.includes('=')) {
      params = params ? params.toLocaleLowerCase() : '';
      return params
        ? value.filter(
            (c: CarDto) => c.carName.toLocaleLowerCase().indexOf(params) !== -1
          )
        : value;
    }
    let paramsArray: string[] = [...new Set(params.toLowerCase().split('&'))];
    return paramsArray
      ? value.filter((c: CarDto) => {
          for (let param of paramsArray) {
            for (let key in Object.keys(c)) {
              if (
                Object.keys(c)[key].toLowerCase() == param.split('=')[0] &&
                Object.values(c)
                  [key].toLocaleLowerCase()
                  .indexOf(param.split('=')[1]) === -1
              ) {
                return false;
              }
            }
          }
          return true;
        })
      : value;
  }
}

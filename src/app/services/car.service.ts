import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable()
export class CarService {

  constructor(private httpClient: HttpClient) { }

  path =  environment.apiURL + '/api/cars';

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.path + '/getall');
  }

  getCarByID(carID: string): Observable<ItemResponseModel<Car>>{
    return this.httpClient.get<ItemResponseModel<Car>>(this.path + '/getbyid?id=' + carID);
  }

  getCarDetails(): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(this.path + '/getcardetails');
  }

  getCarDtoByID(carID: string): Observable<ItemResponseModel<CarDto>>{
    return this.httpClient.get<ItemResponseModel<CarDto>>(this.path + '/getdtobyid?id=' + carID);
  }
  
}

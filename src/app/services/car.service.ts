import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDtoResponseModel } from '../models/carDtoResponseModel';
import { CarResponseModel } from '../models/carResponseModel';
import { CarsDtoResponseModel } from '../models/carsDtoResponseModel';
import { CarsResponseModel } from '../models/carsResponseModel';

@Injectable()
export class CarService {

  constructor(private httpClient: HttpClient) { }

  path =  environment.apiURL + '/api/cars';

  getCars(): Observable<CarsResponseModel> {
    return this.httpClient.get<CarsResponseModel>(this.path + '/getall');
  }

  getCarByID(carID: string): Observable<CarResponseModel>{
    return this.httpClient.get<CarResponseModel>(this.path + '/getbyid?id=' + carID);
  }

  getCarDetails(): Observable<CarsDtoResponseModel> {
    return this.httpClient.get<CarsDtoResponseModel>(this.path + '/getcardetails');
  }

  getCarDtoByID(carID: string): Observable<CarDtoResponseModel>{
    return this.httpClient.get<CarDtoResponseModel>(this.path + '/getdtobyid?id=' + carID);
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  constructor(private httpClient: HttpClient) { }

  path =  environment.apiURL + '/api/cars/';

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.path + 'getall');
  }

  getCarByID(carID: number): Observable<SingleResponseModel<Car>>{
    return this.httpClient.get<SingleResponseModel<Car>>(this.path + 'getbyid?id=' + carID);
  }

  getCarDetails(): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(this.path + 'getcardetails');
  }

  getCarDtoByID(carID: number): Observable<SingleResponseModel<CarDto>>{
    return this.httpClient.get<SingleResponseModel<CarDto>>(this.path + 'getdtobyid?id=' + carID);
  }
  
  getCarsByCategory(carID: string): Observable<SingleResponseModel<CarDto>>{
    return this.httpClient.get<SingleResponseModel<CarDto>>(this.path + 'getdtobyid?id=' + carID);
  }
  
  getCarDetailsByColorName(colorName: string): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(this.path + 'getcardetailsbycolorname?name=' + colorName); 
  }

  getCarDetailsByBrandName(brandName: string): Observable<ListResponseModel<CarDto>> {
    return this.httpClient.get<ListResponseModel<CarDto>>(this.path + 'getcardetailsbybrandname?name=' + brandName); 
  }

  addCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'add', car);
  }

  updateCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'update', car);
  }

  deleteCar(car: Car): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'delete', car);
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { RentalsDtoResponseModel } from '../models/rentalsDtoResponseModel';

@Injectable()
export class RentalService {
  constructor(private httpClient: HttpClient) {}

  path = environment.apiURL + '/api/rentals';

  getRentals(): Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.path + '/getall');
  }

  getRentalDetails(): Observable<RentalsDtoResponseModel> {
    return this.httpClient.get<RentalsDtoResponseModel>(this.path + '/getrentaldetails');
  }
}

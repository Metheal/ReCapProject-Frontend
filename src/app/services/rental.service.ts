import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';

@Injectable()
export class RentalService {
  constructor(private httpClient: HttpClient) {}

  path = environment.apiURL + '/api/rentals';

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.path + '/getall');
  }

  getRentalDetails(): Observable<ListResponseModel<RentalDto>> {
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.path + '/getrentaldetails');
  }
}

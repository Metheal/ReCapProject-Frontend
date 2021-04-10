import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDto } from '../models/rentalDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private httpClient: HttpClient) {}

  path = environment.apiURL + '/api/rentals/';

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.path + 'getall');
  }

  getRentalDetails(): Observable<ListResponseModel<RentalDto>> {
    return this.httpClient.get<ListResponseModel<RentalDto>>(
      this.path + 'getrentaldetails'
    );
  }

  add(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'add', rental);
  }

  getRentalByID(id: number): Observable<SingleResponseModel<RentalDto>> {
    return this.httpClient.get<SingleResponseModel<RentalDto>>(
      this.path + 'getdtobyid?id=' + id
    );
  }

  getAllByCustomerID(id: number): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(
      this.path + 'getallbycustomerid?id=' + id
    );
  }

  getSingleByCarID(
    carID: number,
    rentDate: Date,
    returnDate: Date
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.path +
        'getsinglebycarid?carID=' +
        carID +
        '&rentDate=' +
        rentDate +
        '&returnDate=' +
        returnDate
    );
  }
}

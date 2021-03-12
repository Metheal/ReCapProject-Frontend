import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable()
export class CustomerService {

  constructor(private httpClient: HttpClient) { }
  path: string = environment.apiURL + '/api/customers';

  getCustomers(): Observable<CustomerResponseModel> {
    return this.httpClient.get<CustomerResponseModel>(this.path + '/getall')
  }
}

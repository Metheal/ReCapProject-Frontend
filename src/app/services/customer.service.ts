import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}
  path: string = environment.apiURL + '/api/customers/';

  getAll(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.path + 'getall'
    );
  }

  getByUserID(id: number): Observable<SingleResponseModel<Customer>> {
    return this.httpClient.get<SingleResponseModel<Customer>>(
      this.path + 'getbyuserid?id=' + id
    );
  }

  add(customerModel: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.path + 'add',
      customerModel
    );
  }

  update(customerModel: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.path + 'update',
      customerModel
    );
  }

  delete(customerModel: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.path + 'delete',
      customerModel
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  path = environment.apiURL + '/api/payments';

  addPayment(payment: Payment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + '/add', payment);
  }

  deletePayment(payment: Payment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + '/delete', payment);
  }

  updatePayment(payment: Payment): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + '/update', payment);
  }

  getAll(): Observable<ListResponseModel<Payment>> {
    return this.httpClient.get<ListResponseModel<Payment>>(
      this.path + '/getall'
    );
  }

  getAllByRentalID(id: number): Observable<ListResponseModel<Payment>> {
    return this.httpClient.get<ListResponseModel<Payment>>(
      this.path + '/getallbyrentalid?id=' + id
    );
  }

  getByID(id: number): Observable<Payment> {
    return this.httpClient.get<Payment>(this.path + '/getbyid?id=' + id);
  }
}

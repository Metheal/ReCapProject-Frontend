import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  constructor(private httpClient: HttpClient) {}

  path: string = environment.apiURL + '/api/creditCards';

  getCreditCardsByCustomerID(
    id: number
  ): Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(
      this.path + '/getallbycustomerid?id=' + id
    );
  }

  add(creditCardModel: CreditCard, save: boolean): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.path + '/add?save=' + save,
      creditCardModel
    );
  }
}

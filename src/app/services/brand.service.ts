import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';

@Injectable()
export class BrandService {
  constructor(private httpClient: HttpClient) {}
  path: string = 'https://localhost:44353/api/brands/getall';

  getBrands(): Observable<ListResponseModel<Brand>> {

    return this.httpClient.get<ListResponseModel<Brand>>(this.path);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brandResponseModel';

@Injectable()
export class BrandService {
  constructor(private httpClient: HttpClient) {}
  path: string = 'https://localhost:44353/api/brands/getall';

  getBrands(): Observable<BrandResponseModel> {

    return this.httpClient.get<BrandResponseModel>(this.path);
  }
}

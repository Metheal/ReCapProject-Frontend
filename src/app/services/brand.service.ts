import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpClient: HttpClient) {}
  path: string = environment.apiURL + '/api/brands/';

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.path + 'getall');
  }

  getBrand(id: number): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.get<SingleResponseModel<Brand>>(this.path + 'getbyid?id=' + id);
  }

  addBrand(brandModel: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'add', brandModel);
  }

  updateBrand(brandModel: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'update', brandModel);
  }

  deleteBrand(brandModel: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'delete', brandModel);
  }
}

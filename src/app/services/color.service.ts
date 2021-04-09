import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private httpClient: HttpClient) {}
  path: string = environment.apiURL + '/api/colors/';

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.path + 'getall');
  }

  getColor(id: number): Observable<SingleResponseModel<Color>> {
    return this.httpClient.get<SingleResponseModel<Color>>(this.path + 'getbyid?id=' + id)
  }

  addColor(colorModel: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'add', colorModel);
  } 

  updateColor(colorModel: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'update', colorModel);
  } 

  deleteColor(colorModel: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'delete', colorModel);
  } 
}

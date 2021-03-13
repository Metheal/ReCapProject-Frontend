import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';

@Injectable()
export class ColorService {
  constructor(private httpClient: HttpClient) {}
  path: string = environment.apiURL + '/api/colors';

  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.path + '/getall');
  }
}

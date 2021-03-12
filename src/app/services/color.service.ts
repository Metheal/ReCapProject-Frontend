import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';
import { environment } from 'src/environments/environment';

@Injectable()
export class ColorService {
  constructor(private httpClient: HttpClient) {}
  path: string = environment.apiURL + '/api/colors';

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.path + '/getall');
  }
}

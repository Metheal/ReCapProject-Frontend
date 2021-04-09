import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  path: string = environment.apiURL + '/api/carImages/';

  constructor(private httpClient: HttpClient) {}

  getAllImages(): Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(
      this.path + 'getall'
    );
  }

  getImagesByCarID(id: number): Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(
      this.path + 'getimagesbycarid?id=' + id
    );
  }

  addImage(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'add', formData);
  }

  updateImage(formData: FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'update', formData);
  }

  deleteImage(imageModel: CarImage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.path + 'delete',
      imageModel
    );
  }
}

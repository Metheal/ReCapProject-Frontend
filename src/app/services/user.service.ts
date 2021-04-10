import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  path: string = environment.apiURL + '/api/users/';

  getUserByID(id: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.path + 'getbyid?id=' + id);
  }

  getAllUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.path + 'getall');
  }

  updateUser(userModel: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'update', userModel);
  }
  
  deleteUser(userModel: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.path + 'delete', userModel);
  }
}

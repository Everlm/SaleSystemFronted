import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../Interfaces/base-response';
import { Login } from '../Interfaces/login';
import { User } from '../Interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.endpoint + "User/";

  constructor(private http: HttpClient) { }

  Login(request: Login): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.apiUrl}Login`, request)
  }

  List(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}List`)
  }

  Create(request: User): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.apiUrl}Create`, request)
  }

  Edit(request: User): Observable<BaseResponse> {
    return this.http.put<BaseResponse>(`${this.apiUrl}Edit`, request)
  }

  Delete(id: number): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(`${this.apiUrl}Delete/${id}`)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../Interfaces/base-response';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl: string = environment.endpoint + "Menu/";

  constructor(private http: HttpClient) { }

  List(userId: number): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}List?userId=${userId}`)
  }
}

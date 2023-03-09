import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../Interfaces/base-response';


@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  private apiUrl: string = environment.endpoint + "DashBoard/";

  constructor(private http: HttpClient) { }

  GetDashBoard(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}GetDashBoard`)
  }
}

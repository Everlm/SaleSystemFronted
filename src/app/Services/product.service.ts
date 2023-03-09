import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../Interfaces/base-response';
import { Product } from '../Interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl: string = environment.endpoint + "Product/";

  constructor(private http: HttpClient) { }

  List(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}List`)
  }

  Create(request: Product): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.apiUrl}Create`, request)
  }

  Edit(request: Product): Observable<BaseResponse> {
    return this.http.put<BaseResponse>(`${this.apiUrl}Edit`, request)
  }

  Delete(id: number): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(`${this.apiUrl}Delete/${id}`)
  }
}

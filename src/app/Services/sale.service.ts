import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../Interfaces/base-response';
import { Sale } from '../Interfaces/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl: string = environment.endpoint + "Sale/";

  constructor(private http: HttpClient) { }

  Register(request: Sale): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.apiUrl}Register`, request)
  }

  GetHistory(findBy: string, saleNumber: string, startDate: string, endDate: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}GetHistory?findBy=${findBy}&saleNumber=${saleNumber}&startDate=${startDate}&endDate=${endDate}`)
  }

  Report(startDate: string, endDate: string): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.apiUrl}ReportSale?startDate=${startDate}&endDate=${endDate}`)
  }




}

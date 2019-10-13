import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { } 

  getAll():Observable<any[]>{
    return this._http.get<any[]>(environment.baseUrl + 'orders/'); 
  }

  getSingle(orderId):Observable<any>{
    return this._http.get<any>(environment.baseUrl + 'orders/' + orderId);
  }


}

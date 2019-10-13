import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  getAll():Observable<any[]>{ 
    return this._http.get<any[]>(environment.baseUrl + 'customers/');
  } 

  getSingle(customerId):Observable<any>{
    return this._http.get<any>(environment.baseUrl + 'customers/' + customerId);
  }

  create(formData:any):Observable<any>{
    // let httpheaders = new HttpHeaders()
    // .set('content-type','multipart/form-data');
    // let options = {
    //   headers:httpheaders 
    // };
    return this._http.post<any>(environment.baseUrl + 'customers/', formData, {
      reportProgress: true,
      observe: 'events'
    });
  } 

  delete(customerId:String):Observable<any[]>{
    return this._http.delete<any[]>(environment.baseUrl + 'customers/' + customerId);
  }
 
  update(customerId, updateCustomer):Observable<any>{ 
    return this._http.patch<any>(environment.baseUrl + 'customers/' + customerId, updateCustomer);
  }
 
}

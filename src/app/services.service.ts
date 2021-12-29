import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private _http: HttpClient) { }

  apiUrl = 'http://127.0.0.1:3000/customers/add';

  saveCustomerDetails(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data)
  }
}

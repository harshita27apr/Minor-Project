import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor (private http : HttpClient) { }

  check(array) : Observable<any> {
    return this.http.post("http://localhost:3000/checkregister",array).pipe(map(response => response));
  }

  addgov(array) : Observable<any> {
    return this.http.post("http://localhost:3000/govregister",array).pipe(map(response => response));
  }

  addpar(array) : Observable<any> {
    return this.http.post("http://localhost:3000/parentregister",array).pipe(map(response => response));
  }

  addcre(array) : Observable<any> {
    console.log("inside service",array);
    return this.http.post("http://localhost:3000/crecheregister",array).pipe(map(response => response));
  }
}
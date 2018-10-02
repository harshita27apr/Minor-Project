import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  email;
  arr;

  constructor(
    private http : HttpClient
  ) { }

  contact(array) :Observable<any> {
    return this.http.post('http://localhost:3000/contact',array).pipe(map(res => res));
  }

  addnotice(title,description) : Observable<any>{
    this.arr = {
      "title" : title,
      "description" : description,
      "email" : this.email
    }
    return this.http.post('http://localhost:3000/notice',this.arr).pipe(map(res => res));
  }

  setcreche(email) {
    this.email = email;
  }

  noticelist() : Observable<any> {
    return this.http.get('http://localhost:3000/noticelist').pipe(map(response => response));
  }


}

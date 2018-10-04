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
  a;
  e;
  array;

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

  getparent(email) {
    return this.http.get('http://localhost:3000/getparent',email).pipe(map(res => res));
  }

  noticelist() : Observable<any> {
    this.array = {
      "email" : this.email
    }
    return this.http.post('http://localhost:3000/noticelist',this.array).pipe(map(response => response));
  }

  complain() : Observable<any> {
    return this.http.get('http://localhost:3000/complainlist').pipe(map(response => response));
  }

  addcomplain(subject,description) : Observable<any> {
    this.a = {
      "subject" : subject,
      "description" : description,
      "email" : this.e
    }
    return this.http.post('http://localhost:3000/complain',this.a).pipe(map(response => response));
  }


}

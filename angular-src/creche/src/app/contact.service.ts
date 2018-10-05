import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  crecheEmail;
  parentEmail;
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
      "crecheEmail" : this.crecheEmail,
    }
    return this.http.post('http://localhost:3000/notice',this.arr).pipe(map(res => res));
  }

  setCreche(email) {
    this.crecheEmail = email;
  }

  setParent(email) {
    this.parentEmail = email;
  }

  getparent(email) {
    return this.http.get('http://localhost:3000/getparent',email).pipe(map(res => res));
  }

  noticelist() : Observable<any> {
    return this.http.post('http://localhost:3000/noticelist',{"email":this.crecheEmail}).pipe(map(response => response));
  }

  complain() : Observable<any> {
    return this.http.post('http://localhost:3000/complainlist',{"crecheEmail":this.crecheEmail}).pipe(map(response => response));
  }

  addcomplain(subject,description) : Observable<any> {
    this.arr = {
      "subject" : subject,
      "description" : description,
      "crecheEmail" : this.crecheEmail,
      "parentEmail" : this.parentEmail
    }
    return this.http.post('http://localhost:3000/complain',this.arr).pipe(map(response => response));
  }
}

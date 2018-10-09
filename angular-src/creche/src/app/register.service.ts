import { AddchildrenComponent } from './addchildren/addchildren.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, tap} from 'rxjs/operators'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  value;
  LoggedWho; 
  crecheEmail;

  constructor ( private http : HttpClient ) { }

  setvalue(v) {
    this.value = v;
  }

  getv() : Observable<any> {
    if(this.value == null) {
      this.value = "abc";
    }
    return of (this.value);
  }

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
    return this.http.post("http://localhost:3000/crecheregister",array).pipe(map(response => response));
  }

  login(array) : Observable<any> {
    return this.http.post("http://localhost:3000/login",array)
    .pipe(
      tap( incomingValue => this.LoggedWho = incomingValue ),
      map( () => { return this.LoggedWho })
    );
  }

  crechelist() : Observable<any> {
    return this.http.post("http://localhost:3000/crechelist",{}).pipe(map(response => response));
  }

  addadmin(array) : Observable<any> {
    return this.http.post("http://localhost:3000/sendRegisterMail",array).pipe(map(response => response));
  }

  addcreche(array) : Observable<any> {
    return this.http.post("http://localhost:3000/sendRegisterMail",array).pipe(map(response => response));
  }

  addChildren(email,password) : Observable<any> {
    return this.http.post("http://localhost:3000/sendRegisterMail",{ "email":email , "password":password , "db":"children" , "crecheName":this.value.name , "crecheEmail":this.LoggedWho.email}).pipe(map(response => response));
  }

  addFaculty(name,email,aadhar,mobile,address) : Observable<any> {
    return this.http.post("http://localhost:3000/sendRegisterMail",{ "email":email , "name" : name,"aadhar" : aadhar,"address":address,"mobile" : mobile, "db":"faculty" , "crecheName":this.value.name, "crecheEmail":this.LoggedWho.email }).pipe(map(response => response));
  }

  facultylist() : Observable<any> {
    return this.http.post("http://localhost:3000/facultylist",{"email":this.LoggedWho.email}).pipe(map(response => response));
  }

  childrenlist() : Observable<any> {
    return this.http.post("http://localhost:3000/childrenlist",{"email":this.LoggedWho.email}).pipe(map(response => response));
  }

  crecheEmailSet(mail) {
    this.crecheEmail = mail;
  }

  getCreche() : Observable<any> {
    return this.http.post("http://localhost:3000/getCreche",{"email":this.crecheEmail}).pipe(map(response => response));
  }
 }

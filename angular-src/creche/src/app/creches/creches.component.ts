import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creches',
  templateUrl: './creches.component.html',
  styleUrls: ['./creches.component.css']
})
export class CrechesComponent implements OnInit {

  arr = [];
  value;
  flag;
  flag1;
  flag2;
  flag3;

  constructor( private register : RegisterService,
  private router : Router ) { }
  
  ngOnInit() 
  {
    this.crechelist();
    this.home();
    this.getgov();
    this.getpar();
    this.getcre();
  }

  crechelist() {
    this.register.crechelist().subscribe(res => {
      this.arr = res });
  }

  home() {
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "abc") {
        this.flag = true;
      }
      else return false;
    })
  }

  getgov() {
    this.register.getv().subscribe( res => {
      this.value = res;
      if(this.value == "Government") {
         this.flag1 = true;
      }
      else return false;
    })
  }

  getpar() {
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Parent") {
        this.flag2 = true;
      }
        else return false;
    })
  }

  getcre() {
    this.flag3 = false;
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Creche") {
        this.flag3 = true;
      }
        else return false;
    })
  }

  details(email) {
    this.register.crecheEmailSet(email);
    this.router.navigate(['/crechedetails']);
  }

}

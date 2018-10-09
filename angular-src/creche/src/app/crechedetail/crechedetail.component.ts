import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-crechedetail',
  templateUrl: './crechedetail.component.html',
  styleUrls: ['./crechedetail.component.css']
})
export class CrechedetailComponent implements OnInit {

  response = [];
  value;
  flag;
  flag1;
  flag2;
  flag3;

  constructor( private register : RegisterService,
  private location : Location) { }

  ngOnInit() {
    this.getCreche();
    this.home();
    this.getgov();
    this.getpar();
    this.getcre();
  }

  getCreche() {
    this.register.getCreche().subscribe(res => { this.response = res; });
  }

  goBack() {
    this.location.back();
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


}

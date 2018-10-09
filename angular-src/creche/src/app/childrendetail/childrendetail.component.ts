import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Location } from '@angular/common';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-childrendetail',
  templateUrl: './childrendetail.component.html',
  styleUrls: ['./childrendetail.component.css']
})
export class ChildrendetailComponent implements OnInit {

  response = [];
  value;
  flag;
  flag2;

  constructor( private contact : ContactService,
    private location : Location,
  private register : RegisterService) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.contact.getParentDetail().subscribe(res => { this.response = res; });
  }

  goBack() {
    this.location.back();
  }

  getpar() {
    this.flag2= false;
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Parent") {
        this.flag2 = true;
      }
        else return false;
    })
  }

  getcre() {
    this.flag = false;
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Creche") {
        this.flag = true;
      }
        else return false;
    })
  }

}

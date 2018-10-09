import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Location } from '@angular/common';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-facultydetail',
  templateUrl: './facultydetail.component.html',
  styleUrls: ['./facultydetail.component.css']
})
export class FacultydetailComponent implements OnInit {

  response = [];
  value;
  flag;
  flag2;


  constructor( private contact : ContactService, private location : Location ,
  private register : RegisterService) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.contact.getFacultyDetail().subscribe(res => { this.response = res });
  }

  goBack() {
    this.location.back();
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
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Creche") {
        this.flag = true;
      }
        else return false;
    })
  }

}

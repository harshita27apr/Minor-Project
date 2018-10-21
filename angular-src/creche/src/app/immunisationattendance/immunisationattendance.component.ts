import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-immunisationattendance',
  templateUrl: './immunisationattendance.component.html',
  styleUrls: ['./immunisationattendance.component.css']
})
export class ImmunisationattendanceComponent implements OnInit {

  arr = [];
  toSend = []

  constructor( private register : RegisterService, private location : Location , private contact : ContactService ) { }

  ngOnInit() 
  {
    this.childrenlist(); 
  }

  childrenlist() {
    this.register.childrenlist().subscribe(res =>{
      this.arr = res });
  }

  goBack() {
    this.location.back();
  }
  
  sendAttendance(vals) {
    this.contact.sendAttendance({ "mailType" : "immune" , "email" : vals }).subscribe(response => { });
  }
}

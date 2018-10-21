import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exitattendance',
  templateUrl: './exitattendance.component.html',
  styleUrls: ['./exitattendance.component.css']
})
export class ExitattendanceComponent implements OnInit {

  arr;
  
  constructor( private register : RegisterService , private contact : ContactService , private location : Location) { }

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
    this.contact.sendAttendance({ "mailType" : "exit" , "email" : vals }).subscribe(response => { });
  }
}

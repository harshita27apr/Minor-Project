import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-healthattendance',
  templateUrl: './healthattendance.component.html',
  styleUrls: ['./healthattendance.component.css']
})
export class HealthattendanceComponent implements OnInit {

  arr = [];
  
  constructor( private router:Router , private register : RegisterService, private location : Location ) { }

  ngOnInit() {
    this.childrenlist(); 
  }

  childrenlist() {
    this.register.childrenlist().subscribe(res =>{
      this.arr = res });
  }

  goBack() {
    this.location.back();
  }

  sendattendance(email) {
    this.register.sendAttendance({ "mail" : "health" , "email" : email });
  }
}

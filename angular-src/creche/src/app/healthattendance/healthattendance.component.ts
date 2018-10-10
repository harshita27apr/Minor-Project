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
  toSend = [];
  
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

  sendattendance() {
    this.register.sendAttendance({ "AttendanceType" : "health" , "values" : this.toSend });
    this.router.navigate(['/crechehome']);
  }

  selectToSend(events){
    var i = 0;
    for(i=0;i<this.toSend.length;i++){
      if(events == this.toSend[i]){
        this.toSend.splice(i,1);
        return;
      }
    }
    this.toSend.push(events);
  }
}

import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-healthattendance',
  templateUrl: './healthattendance.component.html',
  styleUrls: ['./healthattendance.component.css']
})
export class HealthattendanceComponent implements OnInit {

  arr = [];
  
  constructor( private register : RegisterService, private location : Location ) { }

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


}

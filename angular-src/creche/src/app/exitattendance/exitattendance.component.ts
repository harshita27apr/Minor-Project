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
  
  constructor( private register : RegisterService,
  private location : Location) { }

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

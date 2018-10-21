import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entryattendance',
  templateUrl: './entryattendance.component.html',
  styleUrls: ['./entryattendance.component.css']
})
export class EntryattendanceComponent implements OnInit {

  arr = [];

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
    this.contact.sendAttendance({ "mailType" : "entry" , "email" : vals }).subscribe(response => { });
  }
}

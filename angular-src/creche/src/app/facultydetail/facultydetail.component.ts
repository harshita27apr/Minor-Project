import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-facultydetail',
  templateUrl: './facultydetail.component.html',
  styleUrls: ['./facultydetail.component.css']
})
export class FacultydetailComponent implements OnInit {

  response;

  constructor( private contact : ContactService,
    private location : Location) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.contact.getFacultyDetail().subscribe(res => { this.response = res;
    console.log(this.response) });
  }

  goBack() {
    this.location.back();
  }

}

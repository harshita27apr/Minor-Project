import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-childrendetail',
  templateUrl: './childrendetail.component.html',
  styleUrls: ['./childrendetail.component.css']
})
export class ChildrendetailComponent implements OnInit {

  response = [];

  constructor( private contact : ContactService,
    private location : Location) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.contact.getParentDetail().subscribe(res => { this.response = res; });
  }

  goBack() {
    this.location.back();
  }

}

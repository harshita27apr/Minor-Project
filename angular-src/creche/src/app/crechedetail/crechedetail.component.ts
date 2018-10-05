import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-crechedetail',
  templateUrl: './crechedetail.component.html',
  styleUrls: ['./crechedetail.component.css']
})
export class CrechedetailComponent implements OnInit {

  response = null;

  constructor( private register : RegisterService,
  private location : Location) { }

  ngOnInit() {
    this.getCreche();
  }

  getCreche() {
    this.register.getCreche().subscribe(res => { this.response = res; });
  }

  goBack() {
    this.location.back();
  }

}

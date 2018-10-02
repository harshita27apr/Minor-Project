import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  arr;
  res;
  value;
  flag2 = false;
  flag3 = false;

  constructor( private cont : ContactService,
    private register : RegisterService) { }

  ngOnInit() {
    this.nlist();
    this.getpar();
    this.getcre()
  }

  nlist() {
    this.cont.noticelist().subscribe(res => {
      this.arr = res });
  }

  getpar() {
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Parent") {
        this.flag2 = true;
      }
        else return false;
    })
  }

  getcre() {
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Creche") {
        this.flag3 = true;
      }
        else return false;
    })
  }
}

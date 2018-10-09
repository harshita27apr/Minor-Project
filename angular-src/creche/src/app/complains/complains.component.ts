import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.css']
})
export class ComplainsComponent implements OnInit {

  arr=[];
  res;

  constructor( private contact : ContactService) { }

  ngOnInit() {
    this.complist();
  }

  complist() {
    this.contact.complain().subscribe(res => {
      this.arr = res });
  }

}

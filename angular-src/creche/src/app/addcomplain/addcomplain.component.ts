import { Component, OnInit } from '@angular/core';
import {Complain} from '../complain';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-addcomplain',
  templateUrl: './addcomplain.component.html',
  styleUrls: ['./addcomplain.component.css']
})
export class AddcomplainComponent implements OnInit {

  comp= new Complain('','');
  res;

  constructor (private con : ContactService) { }

  ngOnInit() {
  }

  complain(subject,description) {
    // this.con.addcomplain(subject,description).subscribe(res => this.res = res)
  }

}
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  check = true;
  check2 = false;
  update;

  constructor( private contact : ContactService,
    private location : Location) { }

  ngOnInit() {
    this.getuser();
  }

  getuser() {
    this.contact.getparentprofile().subscribe(user => this.user = user);
  }

  goBack() : void {
    this.location.back();
  }

  edit() {
    this.check= false;
    this.check2 = true;
  }


  save(name , email ,mobile , address) {
    this.check = true;
    this.check2 = false;
    this.update = {
      "name" : name,
      "email" : email,
      "mobile" : mobile,
      "address" : address
    }
    this.contact.edit(this.update).subscribe(user => this.user = user);
  }

}

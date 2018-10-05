import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact} from '../contact'
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  array;
  res;
  cont = new Contact('','','');


  constructor(
    private contactservice : ContactService , private router:Router ) { 
  }

  ngOnInit() {
  }

  contact(name,email,desc) {
    this.array={
      "name" : name,
      "email" : email,
      "description" : desc
    }
    this.contactservice.contact(this.array).subscribe(res => {});
    this.router.navigate(['/']);
  }

}

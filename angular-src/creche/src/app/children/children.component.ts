import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  arr;
  res;

  constructor(private register : RegisterService,
  private router : Router,
  private contact : ContactService) { }

  ngOnInit() 
  {
    this.childrenlist(); 
  }

  childrenlist() {
    this.register.childrenlist().subscribe(res =>{
      this.arr = res });
  }

  details(email) {
    this.router.navigate(['/childrendetail']);
    this.contact.setParentEmail(email);

  }


}

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
  value;
  flag;
  flag2;

  constructor(private register : RegisterService,
  private router : Router,
  private contact : ContactService) { }

  ngOnInit() 
  {
    this.childrenlist(); 
    this.getcre();
    this.getpar();
  }

  childrenlist() {
    this.register.childrenlist().subscribe(res =>{
      this.arr = res });
  }

  details(email) {
    this.router.navigate(['/childrendetail']);
    this.contact.setParentEmail(email);

  }

  getpar() {
    this.flag2= false;
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Parent") {
        this.flag2 = true;
      }
        else return false;
    })
  }

  getcre() {
    this.flag = false;
    this.register.getv().subscribe(res => {
      this.value = res;
      if(this.value == "Creche") {
        this.flag = true;
      }
        else return false;
    })
  }


}

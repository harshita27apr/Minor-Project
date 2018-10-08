import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {

  arr;
  res;
  value;
  flag;
  flag2;

  constructor(private register : RegisterService,
    private contact : ContactService,
    private router : Router) { }

  ngOnInit() 
  {
    this.facultylist(); 
    this.getcre();
    this.getpar();
  }

  facultylist() {
    this.register.facultylist().subscribe(res =>{
      this.arr = res });
  }

  details(email) {
    this.contact.setFacultyEmail(email);
    this.router.navigate(['/facultydetail'])
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
        this.flag = true;
      }
        else return false;
    })
  }
}

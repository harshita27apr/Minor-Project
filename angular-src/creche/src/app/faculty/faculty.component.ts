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

  constructor(private register : RegisterService,
    private contact : ContactService,
    private router : Router) { }

  ngOnInit() 
  {
    this.facultylist(); 
  }

  facultylist() {
    this.register.facultylist().subscribe(res =>{
      this.arr = res });
  }

  details(email) {
    this.contact.setFacultyEmail(email);
    this.router.navigate(['/facultydetail'])
  }
}

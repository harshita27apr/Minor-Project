import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  res;

  constructor( private router : Router,
  private register : RegisterService) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.register.setvalue('abc');
    this.router.navigate(['/']);
  }




}

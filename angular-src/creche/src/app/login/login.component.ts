import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { ContactService} from '../contact.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  arr;
  res;

  constructor(private register : RegisterService,
    private contact : ContactService,
  private router : Router) { }

  ngOnInit() {
  }

  loginUser(email,pass,radio) {
    this.arr = {
      "email" : email,
      "password" : pass,
      "radio" : radio
     }
     this.register.login(this.arr).subscribe(res => { this.res =res
      if(radio == "Government" && this.res.result == true) {
        this.register.setvalue("Government")
        this.router.navigate(['/govhome']);
      }
      else if (radio == "Parent" && this.res.result == true) {
        this.register.setvalue("Parent")
        this.router.navigate(['/parenthome']);
      }
      else if (radio == "Creche" && this.res.result == true) {
        this.register.setvalue("Creche")
        this.contact.setcreche(email);
        this.router.navigate(['/crechehome']);
      }
    })
  }

}

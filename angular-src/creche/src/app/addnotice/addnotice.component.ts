import { Component, OnInit } from '@angular/core';
import {Notice} from '../notice'
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addnotice',
  templateUrl: './addnotice.component.html',
  styleUrls: ['./addnotice.component.css']
})
export class AddnoticeComponent implements OnInit {

  not = new Notice('','');
  res;


  constructor( private contser : ContactService , private router:Router ) { }

  ngOnInit() {
  }

  notice(title,description) {
    this.contser.addnotice(title,description).subscribe(res => this.res = res)
    this.router.navigate(['/crechehome']);
  }

}

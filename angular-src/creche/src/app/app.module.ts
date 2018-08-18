import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoutingModule  } from './routing.module' ;
import { HttpClientModule } from '@angular/common/http';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CrechesComponent } from './creches/creches.component';
import { ContactService } from './contact.service';
import { RegisterComponent } from './register/register.component';
import { CrecheregisterComponent } from './crecheregister/crecheregister.component';
import { ParentregisterComponent } from './parentregister/parentregister.component';
import { GovregisterComponent } from './govregister/govregister.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    CrechesComponent,
    RegisterComponent,
    CrecheregisterComponent,
    ParentregisterComponent,
    GovregisterComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpClientModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
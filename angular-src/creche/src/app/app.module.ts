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
import { GovhomeComponent } from './govhome/govhome.component';
import { AddcrecheComponent } from './addcreche/addcreche.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { ParenthomeComponent } from './parenthome/parenthome.component';
import { CrechehomeComponent } from './crechehome/crechehome.component';
import { AddfacultyComponent } from './addfaculty/addfaculty.component';
import { AddchildrenComponent } from './addchildren/addchildren.component';
import { FacultyComponent } from './faculty/faculty.component';
import { ChildrenComponent } from './children/children.component';
import { AddnoticeComponent } from './addnotice/addnotice.component';
import { ComplainsComponent } from './complains/complains.component';
import { AddcomplainComponent } from './addcomplain/addcomplain.component';
import { NoticeComponent } from './notice/notice.component';
import { LogoutComponent } from './logout/logout.component';
import { CrechedetailComponent } from './crechedetail/crechedetail.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EntryattendanceComponent } from './entryattendance/entryattendance.component';
import { ExitattendanceComponent } from './exitattendance/exitattendance.component';
import { HealthattendanceComponent } from './healthattendance/healthattendance.component';
import { ImmunisationattendanceComponent } from './immunisationattendance/immunisationattendance.component';

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
    GovregisterComponent,
    GovhomeComponent,
    AddcrecheComponent,
    AddadminComponent,
    ParenthomeComponent,
    CrechehomeComponent,
    AddfacultyComponent,
    AddchildrenComponent,
    FacultyComponent,
    ChildrenComponent,
    AddnoticeComponent,
    ComplainsComponent,
    AddcomplainComponent,
    NoticeComponent,
    LogoutComponent,
    CrechedetailComponent,
    AttendanceComponent,
    EntryattendanceComponent,
    ExitattendanceComponent,
    HealthattendanceComponent,
    ImmunisationattendanceComponent
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

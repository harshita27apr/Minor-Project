import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitattendanceComponent } from './exitattendance.component';

describe('ExitattendanceComponent', () => {
  let component: ExitattendanceComponent;
  let fixture: ComponentFixture<ExitattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthattendanceComponent } from './healthattendance.component';

describe('HealthattendanceComponent', () => {
  let component: HealthattendanceComponent;
  let fixture: ComponentFixture<HealthattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

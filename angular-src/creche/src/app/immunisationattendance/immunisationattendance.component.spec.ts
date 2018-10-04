import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunisationattendanceComponent } from './immunisationattendance.component';

describe('ImmunisationattendanceComponent', () => {
  let component: ImmunisationattendanceComponent;
  let fixture: ComponentFixture<ImmunisationattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmunisationattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunisationattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

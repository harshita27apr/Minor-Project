import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryattendanceComponent } from './entryattendance.component';

describe('EntryattendanceComponent', () => {
  let component: EntryattendanceComponent;
  let fixture: ComponentFixture<EntryattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

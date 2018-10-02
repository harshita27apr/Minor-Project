import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcomplainComponent } from './addcomplain.component';

describe('AddcomplainComponent', () => {
  let component: AddcomplainComponent;
  let fixture: ComponentFixture<AddcomplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcomplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcomplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

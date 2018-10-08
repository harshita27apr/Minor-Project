import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrendetailComponent } from './childrendetail.component';

describe('ChildrendetailComponent', () => {
  let component: ChildrendetailComponent;
  let fixture: ComponentFixture<ChildrendetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrendetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrendetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

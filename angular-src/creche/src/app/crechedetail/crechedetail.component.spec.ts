import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrechedetailComponent } from './crechedetail.component';

describe('CrechedetailComponent', () => {
  let component: CrechedetailComponent;
  let fixture: ComponentFixture<CrechedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrechedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrechedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProComponent } from './new-pro.component';

describe('NewProComponent', () => {
  let component: NewProComponent;
  let fixture: ComponentFixture<NewProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

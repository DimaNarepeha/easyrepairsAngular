import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProffComponent } from './my-proff.component';

describe('MyProffComponent', () => {
  let component: MyProffComponent;
  let fixture: ComponentFixture<MyProffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

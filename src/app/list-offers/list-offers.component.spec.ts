import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffersComponent } from './list-offers.component';

describe('ListOffersComponent', () => {
  let component: ListOffersComponent;
  let fixture: ComponentFixture<ListOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

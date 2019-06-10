import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractsComponent } from './list-contracts.component';

describe('ListContractsComponent', () => {
  let component: ListContractsComponent;
  let fixture: ComponentFixture<ListContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

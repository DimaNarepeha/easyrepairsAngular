import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpGeneralComponent } from './sp-general.component';

describe('SpGeneralComponent', () => {
  let component: SpGeneralComponent;
  let fixture: ComponentFixture<SpGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

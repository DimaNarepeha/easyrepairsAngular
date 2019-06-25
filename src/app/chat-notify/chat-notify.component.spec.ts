import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNotifyComponent } from './chat-notify.component';

describe('ChatNotifyComponent', () => {
  let component: ChatNotifyComponent;
  let fixture: ComponentFixture<ChatNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

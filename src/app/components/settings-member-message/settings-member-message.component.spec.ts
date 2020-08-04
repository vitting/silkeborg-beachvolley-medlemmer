import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMemberMessageComponent } from './settings-member-message.component';

describe('SettingsMemberMessageComponent', () => {
  let component: SettingsMemberMessageComponent;
  let fixture: ComponentFixture<SettingsMemberMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMemberMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMemberMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

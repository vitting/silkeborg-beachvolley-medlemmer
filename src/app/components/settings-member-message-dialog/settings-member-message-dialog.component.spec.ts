import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMemberMessageDialogComponent } from './settings-member-message-dialog.component';

describe('SettingsMemberMessageDialogComponent', () => {
  let component: SettingsMemberMessageDialogComponent;
  let fixture: ComponentFixture<SettingsMemberMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMemberMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMemberMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

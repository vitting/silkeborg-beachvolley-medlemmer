import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEmailTemplatesDialogComponent } from './settings-email-templates-dialog.component';

describe('SettingsEmailTemplatesDialogComponent', () => {
  let component: SettingsEmailTemplatesDialogComponent;
  let fixture: ComponentFixture<SettingsEmailTemplatesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsEmailTemplatesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEmailTemplatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

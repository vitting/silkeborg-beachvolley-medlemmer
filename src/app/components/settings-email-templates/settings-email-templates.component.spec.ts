import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEmailTemplatesComponent } from './settings-email-templates.component';

describe('SettingsEmailTemplatesComponent', () => {
  let component: SettingsEmailTemplatesComponent;
  let fixture: ComponentFixture<SettingsEmailTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsEmailTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

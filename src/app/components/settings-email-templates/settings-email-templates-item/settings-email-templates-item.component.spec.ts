import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEmailTemplatesItemComponent } from './settings-email-templates-item.component';

describe('SettingsEmailTemplatesItemComponent', () => {
  let component: SettingsEmailTemplatesItemComponent;
  let fixture: ComponentFixture<SettingsEmailTemplatesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsEmailTemplatesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEmailTemplatesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

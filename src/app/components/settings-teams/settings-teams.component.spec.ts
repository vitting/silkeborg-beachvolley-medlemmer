import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTeamsComponent } from './settings-teams.component';

describe('SettingsTeamsComponent', () => {
  let component: SettingsTeamsComponent;
  let fixture: ComponentFixture<SettingsTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

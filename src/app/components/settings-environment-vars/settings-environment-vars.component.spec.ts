import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEnvironmentVarsComponent } from './settings-environment-vars.component';

describe('SettingsEnvironmentVarsComponent', () => {
  let component: SettingsEnvironmentVarsComponent;
  let fixture: ComponentFixture<SettingsEnvironmentVarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsEnvironmentVarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsEnvironmentVarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

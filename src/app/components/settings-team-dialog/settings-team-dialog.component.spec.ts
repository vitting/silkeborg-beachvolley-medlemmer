import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTeamDialogComponent } from './settings-team-dialog.component';

describe('SettingsTeamDialogComponent', () => {
  let component: SettingsTeamDialogComponent;
  let fixture: ComponentFixture<SettingsTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

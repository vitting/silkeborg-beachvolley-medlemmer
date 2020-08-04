import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsTemplateVariableDialogComponent } from "./settings-template-variable-dialog.component";

describe("SettingsEmailTemplateVariableDialogComponent", () => {
  let component: SettingsTemplateVariableDialogComponent;
  let fixture: ComponentFixture<SettingsTemplateVariableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsTemplateVariableDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      SettingsTemplateVariableDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

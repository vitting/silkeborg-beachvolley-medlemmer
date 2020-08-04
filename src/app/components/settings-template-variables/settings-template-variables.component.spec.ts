import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SettingsTemplateVariablesComponent } from "./settings-template-variables.component";

describe("SettingsEmailTemplateVariablesComponent", () => {
  let component: SettingsTemplateVariablesComponent;
  let fixture: ComponentFixture<SettingsTemplateVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsTemplateVariablesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTemplateVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

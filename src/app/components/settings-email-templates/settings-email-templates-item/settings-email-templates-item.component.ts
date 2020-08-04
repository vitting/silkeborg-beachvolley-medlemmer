import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TemplateEmail } from "src/models/template-email";

@Component({
  selector: "app-settings-email-templates-item",
  templateUrl: "./settings-email-templates-item.component.html",
  styleUrls: ["./settings-email-templates-item.component.scss"],
})
export class SettingsEmailTemplatesItemComponent implements OnInit {
  @Input() emailTemplate: TemplateEmail;
  @Output() editEmailTextClick = new EventEmitter<TemplateEmail>();
  @Output() showEmailTextClick = new EventEmitter<TemplateEmail>();
  @Output() editTemplateClick = new EventEmitter<TemplateEmail>();
  @Output() deleteTemplateClick = new EventEmitter<TemplateEmail>();
  constructor() {}

  ngOnInit(): void {}

  editEmailText(template: TemplateEmail) {
    this.editEmailTextClick.emit(template);
  }

  showEmailText(template: TemplateEmail) {
    this.showEmailTextClick.emit(template);
  }

  editTemplate(template: TemplateEmail) {
    this.editTemplateClick.emit(template);
  }

  deleteTemplate(template: TemplateEmail) {
    this.deleteTemplateClick.emit(template);
  }
}

import { Component, OnInit, Inject } from "@angular/core";
import { TemplateEmail } from "src/models/template-email";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "./show-email-template.component.html",
  styleUrls: ["./show-email-template.component.scss"],
})
export class ShowEmailTemplateComponent implements OnInit {
  subject = "";
  body = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TemplateEmail
  ) {}

  ngOnInit(): void {
    this.subject = this.data.subject;
    this.body = this.data.body;
  }
}

export interface TemplateEmail {
  id: string;
  subject: string;
  body: string;
  type: TemplateEmailType;
  name: string;
  description: string;
  recipientType: TemplateEmailRecipientType;
}

export type TemplateEmailType =
  | "membercreate"
  | "memberdelete"
  | "adminusercreate"
  | "adminuserdelete"
  | "custom";

export type TemplateEmailRecipientType = "member" | "adminuser";

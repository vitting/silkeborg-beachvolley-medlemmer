import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilityService } from "./utility.service";
import { LogService } from "./log.service";
import {
  EmailToSend,
  EmailToSendRecipient,
  EmailToSendRecipientType,
} from "src/models/email-to-send";
import { Member } from "src/models/member";
import { ContributionService } from "./contribution.service";
import { TeamService } from "./team.service";
import { AdminUser } from "src/models/admin-user";

@Injectable({
  providedIn: "root",
})
export class EmailToSendService {
  private emailsToSend = "emailservice_waiting";
  constructor(
    private db: AngularFirestore,
    private utilityService: UtilityService,
    private logService: LogService,
    private contributionsService: ContributionService,
    private teamService: TeamService
  ) {}

  createEmailRecipientsForMembers(members: Member[]): EmailToSendRecipient[] {
    const recipients: EmailToSendRecipient[] = [];
    for (const member of members) {
      const teamName = this.teamService.teamsIndex[member.teamId].name;
      const payment: number =
        this.contributionsService.getContribution(
          this.utilityService.currentYear,
          member.teamId
        )?.amount ?? 0;
      recipients.push({
        memberId: member.id,
        name: member.name,
        email: member.email,
        payment,
        teamId: member.teamId,
        teamName,
        userId: null,
      });
    }
    return recipients;
  }

  createEmailRecipientsForAdminUser(
    adminUser: AdminUser
  ): EmailToSendRecipient {
    return {
      email: adminUser.email,
      name: adminUser.name,
      userId: adminUser.id,
      payment: 0,
      teamId: null,
      teamName: null,
      memberId: null,
    };
  }

  createEmailToSend(
    recipients: EmailToSendRecipient[],
    type: EmailToSendRecipientType,
    subject: string = null,
    body: string = null
  ): EmailToSend {
    const id = this.utilityService.newId;
    const createdAt = this.utilityService.timestamp;
    const currentYear = this.utilityService.currentYear;
    return {
      id,
      createdAt,
      recipients,
      body,
      subject,
      currentYear,
      type,
    };
  }

  addEmailToSend(emailToSend: EmailToSend) {
    return this.db
      .collection<EmailToSend>(this.emailsToSend)
      .doc(emailToSend.id)
      .set(emailToSend);
  }

  async sendMailToNewMember(member: Member) {
    const emailSendRecipients = this.createEmailRecipientsForMembers([member]);

    const emailToSendData = this.createEmailToSend(
      emailSendRecipients,
      "membercreate",
      "",
      ""
    );

    return this.addEmailToSend(emailToSendData);
  }

  async sendMailToNewAdminUser(adminUser: AdminUser) {
    const adminUserRecipient = this.createEmailRecipientsForAdminUser(
      adminUser
    );
    const emailSendTo = this.createEmailToSend(
      [adminUserRecipient],
      "adminusercreate",
      null,
      null
    );

    return this.addEmailToSend(emailSendTo);
  }
}

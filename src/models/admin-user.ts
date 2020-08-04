export interface AdminUser {
  id: string;
  gmailUid: string;
  name: string;
  email: string;
  admin: boolean;
  active: boolean;
  createdAt: firebase.firestore.Timestamp;
  firstLoginAt: firebase.firestore.Timestamp;
  lastVisit: firebase.firestore.Timestamp;
}

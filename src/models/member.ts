export interface Member {
  id: string;
  createdAt: firebase.firestore.Timestamp;
  address: string;
  name: string;
  zipcode: number;
  birthDate: firebase.firestore.Timestamp;
  email: string;
  phone: number;
  comment: string;
  payments: MemberPayment;
  adminCommentsCount: number;
  teamId: string;
  sendCreationEmail: boolean;
}

export interface MemberPayment {
  [key: string]: MemberPaymentData;
}

export interface MemberPaymentData {
  paied: boolean;
  teamId: string;
  amount: number;
  year: number;
}

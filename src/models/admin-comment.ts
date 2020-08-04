export interface AdminComment {
  id: string;
  memberId: string;
  userId: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  comment: string;
}

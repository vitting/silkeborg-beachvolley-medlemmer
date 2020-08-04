export interface Log {
  id: string;
  date: firebase.firestore.Timestamp;
  message: string;
  type: LogType;
  userId: string;
  memberId: string;
}

export type LogType =
  | "member"
  | "membercreate"
  | "memberupdate"
  | "memberemail"
  | "adminusercreate"
  | "adminuserupdate"
  | "adminuseremail"
  | "error"
  | "admin";

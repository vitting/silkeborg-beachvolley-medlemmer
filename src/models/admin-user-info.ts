export interface AdminUserInfo {
  userId: string;
  name: string;
  deleted: boolean;
}

export interface AdminUserInfoIndex {
  [key: string]: AdminUserInfo;
}

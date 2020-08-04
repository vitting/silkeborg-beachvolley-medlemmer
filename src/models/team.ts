export interface Team {
  id: string;
  name: string;
  value: string;
  active: boolean;
  deleted: boolean;
}

export interface TeamIndex {
  [key: string]: Team;
}


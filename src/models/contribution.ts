export interface Contribution {
  id: string;
  year: number;
  amount: number;
  teamId: string;
}

export interface ContributionIndex {
  [key: string]: Contribution;
}

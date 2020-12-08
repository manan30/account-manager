export interface ICreditor {
  id: string;
  name: string;
  amount: number;
  currency: string;
  remainingAmount: number;
  createdAt: { seconds: number; nanoseconds: number };
  // TODO: Add last updated at field
  accountSettledOn?: string;
}

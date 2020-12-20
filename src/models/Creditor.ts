export interface ICreditor {
  id?: string;
  name: string;
  amount: number;
  currency: string;
  remainingAmount: number;
  accountSettledOn?: string | null;
  accountSettled: boolean;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

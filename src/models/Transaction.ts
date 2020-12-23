export interface ITransaction {
  id?: string;
  transactionType: string;
  transactionEntity?: string;
  amount: number;
  transactionDate?: string;
  createdAt: { seconds: number; nanoseconds: number };
}

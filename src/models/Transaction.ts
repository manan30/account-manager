export interface ITransaction {
  id?: string;
  transactionType: string;
  amount: number;
  transactionEntity?: string;
  transactionDate?: string;
  createdAt: { seconds: number; nanoseconds: number };
}

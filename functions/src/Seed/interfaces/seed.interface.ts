export interface SeedRequestBody {
  creditor: { clear: boolean; count?: number };
  bankTransactions: { clear: boolean };
  spending: { clear: boolean };
}

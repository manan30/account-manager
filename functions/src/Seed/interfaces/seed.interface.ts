export interface SeedRequestBody {
  creditor: { clear: boolean; count?: number };
  spending: { clear: boolean; count?: number };
  bankTransactions: { clear: boolean };
}

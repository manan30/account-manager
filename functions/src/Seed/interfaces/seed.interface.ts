export interface SeedRequestBody {
  bankTransactions: { clear: boolean };
  spending: { clear: boolean };
  recurring: { clear?: boolean; count?: number };
}

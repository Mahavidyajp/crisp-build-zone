export type TransactionType = 'Expense' | 'Income' | 'Transfer' | 'Payment' | 'Investment' | 'Settlement' | 'Adjustment';
export type Status = 'Draft' | 'Pending' | 'Confirmed' | 'Failed' | 'Cancelled' | 'Needs Verification';
export interface Account { id: string; name: string; institution: string; type: 'Bank' | 'Cash' | 'Wallet' | 'Credit Card' | 'Investment' | 'Other'; opening: number; limit?: number; hidden?: boolean; archived?: boolean }
export interface Transaction { id: string; name: string; amount: number; category: string; accountId: string; destinationId?: string; type: TransactionType; status: Status; date: string; notes?: string; method?: string; reference?: string; spaceId?: string; attachment?: string }
export interface Budget { id: string; name: string; amount: number; category: string }
export interface Goal { id: string; name: string; amount: number; current: number; date: string }
export interface Recurring { id: string; name: string; amount: number; date: string; frequency: string; accountId: string; category: string; paid?: boolean; reminder: boolean }
export interface Person { id: string; name: string; relation: string }
export interface Space { id: string; name: string; kind: string; memberIds: string[] }
export interface Settlement { id: string; name: string; amount: number; paid: boolean; spaceId: string; accountId: string }
export interface Holding { id: string; name: string; kind: string; amount: number; current: number; weight?: number; purity?: string }
export interface DocumentRecord { id: string; name: string; kind: string; size: number; date: string }
export interface Notice { id: string; name: string; detail: string; kind: string; read: boolean }
export interface MoneyData { accounts: Account[]; transactions: Transaction[]; budgets: Budget[]; goals: Goal[]; recurring: Recurring[]; people: Person[]; spaces: Space[]; settlements: Settlement[]; investments: Holding[]; assets: Holding[]; liabilities: Holding[]; documents: DocumentRecord[]; notifications: Notice[]; currency: string; profile: string; categories: string[] }
export type Collection = Exclude<keyof MoneyData, 'currency' | 'profile' | 'categories'>;
export interface NativeCapabilities { camera: () => Promise<File>; share: (text: string) => Promise<void>; secureStorage: { get: (key: string) => Promise<string | null>; set: (key: string, value: string) => Promise<void> }; unlock: () => Promise<boolean>; subscribeNetwork: (listener: (online: boolean) => void) => () => void }
export interface ReceiptScannerService { extract: (file: File) => Promise<Partial<Transaction>> }

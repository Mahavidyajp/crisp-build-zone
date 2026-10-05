import type { Account, MoneyData, Transaction } from './types';
export const minor = (value: string | number) => Math.round(Number(value) * 100);
export const formatMoney = (amount: number, currency = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount / 100);
export const expenseTypes = ['Expense', 'Payment'];
export function accountBalance(account: Account, transactions: Transaction[]) {
  return transactions.filter(t => t.status === 'Confirmed').reduce((balance, t) => {
    if (t.destinationId === account.id) balance += t.amount;
    if (t.accountId !== account.id) return balance;
    if (t.type === 'Income' || t.type === 'Adjustment') return balance + t.amount;
    return balance - t.amount;
  }, account.opening);
}
export function summary(data: MoneyData, now = new Date()) {
  const today = now.toISOString().slice(0, 10); const month = today.slice(0, 7);
  const confirmed = data.transactions.filter(t => t.status === 'Confirmed');
  const expenses = confirmed.filter(t => expenseTypes.includes(t.type));
  const liquid = data.accounts.filter(a => !a.archived && ['Bank','Cash','Wallet','Other'].includes(a.type)).reduce((sum,a) => sum + accountBalance(a,data.transactions),0);
  const creditDebt = data.accounts.filter(a => a.type === 'Credit Card').reduce((sum,a) => sum + Math.max(0,-accountBalance(a,data.transactions)),0);
  const upcoming = data.recurring.filter(r => !r.paid && r.date <= new Date(now.getFullYear(), now.getMonth()+1,0,12).toISOString().slice(0,10)).reduce((sum,r) => sum+r.amount,0);
  const investment = data.investments.reduce((sum,i) => sum+i.current,0);
  const assets = liquid + investment + data.assets.reduce((sum,i) => sum+i.current,0);
  const liabilities = creditDebt + data.liabilities.reduce((sum,i) => sum+i.current,0);
  const spent = expenses.filter(t=>t.date.startsWith(month)).reduce((sum,t)=>sum+t.amount,0);
  const income = confirmed.filter(t=>t.type==='Income' && t.date.startsWith(month)).reduce((sum,t)=>sum+t.amount,0);
  return { liquid, upcoming, spendable: liquid-upcoming-creditDebt, spent, income, today: expenses.filter(t=>t.date.slice(0,10)===today).reduce((sum,t)=>sum+t.amount,0), assets, liabilities, netWorth: assets-liabilities, investment, attention: data.transactions.filter(t=>['Pending','Needs Verification','Failed'].includes(t.status)) };
}
export function categorySpent(data: MoneyData, category: string) { const month = new Date().toISOString().slice(0,7); return data.transactions.filter(t=>t.status==='Confirmed' && expenseTypes.includes(t.type) && t.date.startsWith(month) && (category==='All' || t.category===category)).reduce((sum,t)=>sum+t.amount,0) }
export function findDuplicate(transactions: Transaction[], candidate: Transaction) { return transactions.find(t=>t.id!==candidate.id && ((candidate.reference && candidate.reference===t.reference) || (t.amount===candidate.amount && t.name.trim().toLowerCase()===candidate.name.trim().toLowerCase() && t.date.slice(0,10)===candidate.date.slice(0,10)))) }
export function equalSplit(amount: number, count: number) { if(count < 1) return []; const share = Math.floor(amount/count); return Array.from({length:count},(_,i)=>share+(i===0 ? amount%count : 0)) }

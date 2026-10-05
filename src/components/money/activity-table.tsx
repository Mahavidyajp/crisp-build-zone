import { useState } from 'react';
import { ArrowDownUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { useMoney } from '@/lib/money/context';
import type { Transaction } from '@/lib/money/types';
import { MoneyAmount, TransactionStatus } from './ui';

export function ActivityTable({ rows, onSelect }: { rows: Transaction[]; onSelect: (t: Transaction) => void }) {
  const { data } = useMoney();
  const [sort, setSort] = useState<'date' | 'amount'>('date');
  const [ascending, setAscending] = useState(false);
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(rows.length / 10));
  const current = Math.min(page, pages - 1);
  const sorted = [...rows].sort((a, b) => (sort === 'date' ? a.date.localeCompare(b.date) : a.amount - b.amount) * (ascending ? 1 : -1));
  const toggle = (next: 'date' | 'amount') => { setAscending(sort === next ? !ascending : false); setSort(next); };
  return <div className="desktop-activity"><Table><TableHeader><TableRow><TableHead aria-sort={sort === 'date' ? ascending ? 'ascending' : 'descending' : 'none'}><Button variant="ghost" onClick={() => toggle('date')}>Date<ArrowDownUp className="size-3"/></Button></TableHead><TableHead>Merchant</TableHead><TableHead>Category</TableHead><TableHead>Account</TableHead><TableHead aria-sort={sort === 'amount' ? ascending ? 'ascending' : 'descending' : 'none'}><Button variant="ghost" onClick={() => toggle('amount')}>Amount<ArrowDownUp className="size-3"/></Button></TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{sorted.slice(current * 10, current * 10 + 10).map(t => <TableRow key={t.id}><TableCell className="text-muted-foreground text-xs">{new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</TableCell><TableCell><Button variant="link" className="text-foreground p-0" onClick={() => onSelect(t)}>{t.name}</Button></TableCell><TableCell className="text-xs">{t.category}</TableCell><TableCell className="text-xs text-muted-foreground">{data.accounts.find(a => a.id === t.accountId)?.institution || 'Account'}</TableCell><TableCell className="whitespace-nowrap"><MoneyAmount amount={t.amount} className={t.type === 'Income' ? 'text-positive' : ''}/></TableCell><TableCell><TransactionStatus status={t.status}/></TableCell></TableRow>)}</TableBody></Table><Pagination className="mt-4 justify-end"><PaginationContent><PaginationItem><Button variant="ghost" size="icon" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)}><ChevronLeft/></Button></PaginationItem><PaginationItem><span className="text-xs text-muted-foreground px-3">{current + 1} / {pages}</span></PaginationItem><PaginationItem><Button variant="ghost" size="icon" aria-label="Next page" disabled={current + 1 >= pages} onClick={() => setPage(current + 1)}><ChevronRight/></Button></PaginationItem></PaginationContent></Pagination></div>;
}
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowUpRight, Wallet, Users, TrendingUp, Tag } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command';
import { useMoney } from '@/lib/money/context';
import { formatMoney } from '@/lib/money/calculations';
import { ResponsiveSurface } from './controls';
import { TransactionForm } from './forms';
import type { Transaction } from '@/lib/money/types';

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data } = useMoney();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Transaction>();
  return <><ResponsiveSurface open={open} onClose={onClose} title="Search Money OS" description="Activity, accounts, categories, people, and investments."><Command className="money-search"><CommandInput placeholder="Search your money…" aria-label="Search Money OS"/><CommandList className="max-h-96"><CommandEmpty>No matching results.</CommandEmpty><CommandGroup heading="Activity">{data.transactions.map(t => <CommandItem key={t.id} value={t.id} keywords={[t.name, t.category, t.notes || '', t.reference || '', String(t.amount / 100), data.accounts.find(a => a.id === t.accountId)?.institution || '']} onSelect={() => { onClose(); setSelected(t); }}><ArrowUpRight/><div className="min-w-0 flex-1"><p className="truncate">{t.name}</p><p className="text-xs text-muted-foreground">{t.category} · {t.status}</p></div><span className="text-xs shrink-0">{formatMoney(t.amount, data.currency)}</span></CommandItem>)}</CommandGroup><CommandSeparator/><CommandGroup heading="Accounts">{data.accounts.map(a => <CommandItem key={a.id} value={a.id} keywords={[a.name, a.institution]} onSelect={() => { onClose(); void navigate({ to: '/accounts' }); }}><Wallet/>{a.institution} · {a.name}</CommandItem>)}</CommandGroup><CommandGroup heading="Categories">{data.categories.map(c => <CommandItem key={c} value={`category-${c}`} keywords={[c]} onSelect={() => { onClose(); void navigate({ to: '/activity' }); }}><Tag/>{c}</CommandItem>)}</CommandGroup><CommandGroup heading="People">{data.people.map(p => <CommandItem key={p.id} value={p.id} keywords={[p.name, p.relation]} onSelect={() => { onClose(); void navigate({ to: '/people' }); }}><Users/>{p.name}</CommandItem>)}</CommandGroup><CommandGroup heading="Investments">{data.investments.map(i => <CommandItem key={i.id} value={i.id} keywords={[i.name, i.kind]} onSelect={() => { onClose(); void navigate({ to: '/investments' }); }}><TrendingUp/>{i.name}</CommandItem>)}</CommandGroup></CommandList></Command></ResponsiveSurface>{selected && <TransactionForm open initial={selected} onClose={() => setSelected(undefined)}/>}</>;
}
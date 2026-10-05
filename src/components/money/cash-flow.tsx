import { Bar, BarChart, XAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useMoney } from '@/lib/money/context';
import { expenseTypes, formatMoney } from '@/lib/money/calculations';

export function CashFlow() {
  const { data } = useMoney();
  const month = new Date().toISOString().slice(0, 7);
  const transactions = data.transactions.filter(t => t.date.startsWith(month) && t.status === 'Confirmed');
  if (!transactions.length) return null;
  const rows = Array.from({ length: 5 }, (_, i) => ({ week: `W${i + 1}`, income: 0, spending: 0 }));
  transactions.forEach(t => { const row = rows[Math.min(4, Math.floor((Number(t.date.slice(8, 10)) - 1) / 7))]; if (!row) return; if (t.type === 'Income') row.income += t.amount; if (expenseTypes.includes(t.type)) row.spending += t.amount; });
  return <ChartContainer className="cash-flow-chart" config={{ income: { label: 'Money in', color: 'var(--positive)' }, spending: { label: 'Money out', color: 'var(--information)' } }} aria-label="Monthly cash flow by week"><BarChart data={rows} accessibilityLayer><CartesianGrid vertical={false} stroke="var(--border)"/><XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8}/><ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(value, name) => <span>{name === 'income' ? 'Money in' : 'Money out'}: {formatMoney(Number(value), data.currency)}</span>}/>}/><Bar dataKey="income" fill="var(--color-income)" radius={[4,4,0,0]} isAnimationActive={false}/><Bar dataKey="spending" fill="var(--color-spending)" radius={[4,4,0,0]} isAnimationActive={false}/></BarChart></ChartContainer>;
}
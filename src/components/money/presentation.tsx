import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Home, CreditCard, Plus, Wallet, UserRound, ScanLine, ArrowUpRight, ArrowDownLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TransactionForm } from './forms';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer';
import type { TransactionType } from '@/lib/money/types';

export function Hint({ label, children }: { label: string; children: ReactNode }) {
  return <Tooltip><TooltipTrigger asChild>{children}</TooltipTrigger><TooltipContent>{label}</TooltipContent></Tooltip>;
}

export function AnimatedContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    root.querySelectorAll('section, .item-card, .setting-row').forEach(element => {
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="animated-content">{children}</div>;
}

const destinations = [
  { label: 'Home', path: '/', icon: Home, paths: ['/'] },
  { label: 'Money', path: '/accounts', icon: CreditCard, paths: ['/accounts', '/activity', '/payments'] },
  { label: 'Plan', path: '/plan', icon: Wallet, paths: ['/plan', '/budgets', '/goals', '/upcoming', '/recurring'] },
  { label: 'More', path: '/more', icon: UserRound, paths: [] },
];

export function FloatingNavigation() {
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<{ type: TransactionType; scan?: boolean | undefined }>();
  const path = useRouterState({ select: state => state.location.pathname });
  const active = destinations.find(item => item.paths.includes(path))?.label || 'More';
  const renderDestination = ({ label, path: destination, icon: Icon }: typeof destinations[number]) => (
      <Hint key={label} label={label}>
        <Button asChild variant="ghost" className="dock-link">
          <Link to={destination} activeOptions={{ exact: true }} data-selected={active === label} aria-current={active === label ? 'page' : undefined}>
            <Icon strokeWidth={1.7} /><span className="sr-only">{label}</span>
          </Link>
        </Button>
      </Hint>
    );
  return <><nav className="mobile-nav floating-dock" aria-label="Bottom navigation">
    {destinations.slice(0, 2).map(renderDestination)}
    <Hint label="Pay & add"><Button variant="ghost" className="dock-add" aria-label="Pay and add" onClick={() => setAdding(true)}><Plus strokeWidth={1.8}/></Button></Hint>
    {destinations.slice(2).map(renderDestination)}
  </nav><Drawer open={adding} onOpenChange={setAdding} shouldScaleBackground={false}><DrawerContent className="money-action-drawer"><DrawerHeader className="text-left relative"><DrawerTitle>Pay & add</DrawerTitle><DrawerDescription>Everyday money, all in one place.</DrawerDescription><DrawerClose asChild><Button variant="ghost" size="icon" className="absolute right-4 top-3" aria-label="Close actions"><X/></Button></DrawerClose></DrawerHeader><div className="money-action-grid">{[{label:'Add expense',icon:Plus,type:'Expense' as const},{label:'Receive money',icon:ArrowDownLeft,type:'Income' as const},{label:'Transfer money',icon:ArrowUpRight,type:'Transfer' as const},{label:'Record payment',icon:CreditCard,type:'Payment' as const},{label:'Scan receipt',icon:ScanLine,type:'Expense' as const,scan:true}].map(a=><Button key={a.label} variant="secondary" onClick={()=>{setAdding(false);setForm({type:a.type,scan:a.scan})}}><a.icon/><span>{a.label}</span><ArrowUpRight className="ml-auto size-4 text-muted-foreground"/></Button>)}</div></DrawerContent></Drawer>{form && <TransactionForm open type={form.type} scan={form.scan} onClose={() => setForm(undefined)}/>}</>;
}
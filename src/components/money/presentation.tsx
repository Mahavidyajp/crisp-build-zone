import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Home, CreditCard, Plus, Wallet, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TransactionForm } from './forms';

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
  { label: 'Accounts', path: '/accounts', icon: CreditCard, paths: ['/accounts', '/activity', '/payments'] },
  { label: 'Plan', path: '/plan', icon: Wallet, paths: ['/plan', '/budgets', '/goals', '/upcoming', '/recurring'] },
  { label: 'More', path: '/more', icon: UserRound, paths: [] },
];

export function FloatingNavigation() {
  const [adding, setAdding] = useState(false);
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
    <Hint label="Add expense"><Button variant="ghost" className="dock-add" aria-label="Add expense" onClick={() => setAdding(true)}><Plus strokeWidth={1.8}/></Button></Hint>
    {destinations.slice(2).map(renderDestination)}
  </nav>{adding && <TransactionForm open type="Expense" onClose={() => setAdding(false)}/>}</>;
}
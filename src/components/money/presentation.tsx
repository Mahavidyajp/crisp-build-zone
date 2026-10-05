import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Home, ArrowLeftRight, LayoutGrid, Users, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  { label: 'Activity', path: '/activity', icon: ArrowLeftRight, paths: ['/activity'] },
  { label: 'Plan', path: '/plan', icon: LayoutGrid, paths: ['/plan', '/budgets', '/goals', '/upcoming', '/recurring'] },
  { label: 'Shared', path: '/shared', icon: Users, paths: ['/shared', '/people', '/settlements'] },
  { label: 'More', path: '/more', icon: MoreHorizontal, paths: [] },
];

export function FloatingNavigation() {
  const path = useRouterState({ select: state => state.location.pathname });
  const active = destinations.find(item => item.paths.includes(path))?.label || 'More';
  return <nav className="mobile-nav floating-dock" aria-label="Bottom navigation">
    {destinations.map(({ label, path: destination, icon: Icon }) => (
      <Hint key={label} label={label}>
        <Button asChild variant="ghost" className="dock-link">
          <Link to={destination} activeOptions={{ exact: true }} data-selected={active === label} aria-current={active === label ? 'page' : undefined}>
            <Icon strokeWidth={1.7} /><span>{label}</span>
          </Link>
        </Button>
      </Hint>
    ))}
  </nav>;
}
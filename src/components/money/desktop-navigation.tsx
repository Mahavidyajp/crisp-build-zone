import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Wallet, Target, Users, Grid2X2, ChevronDown, Bell } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarTrigger } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMoney } from '@/lib/money/context';
import profile from '@/assets/profile.jpg';

const sections = [
  { name: 'Money', icon: Wallet, to: '/accounts', items: [{ label: 'Accounts', to: '/accounts' }, { label: 'Transactions', to: '/activity' }, { label: 'Payments', to: '/payments' }] },
  { name: 'Plan', icon: Target, to: '/plan', items: [{ label: 'Budgets', to: '/budgets' }, { label: 'Goals', to: '/goals' }, { label: 'Recurring', to: '/recurring' }, { label: 'Upcoming', to: '/upcoming' }] },
  { name: 'Shared', icon: Users, to: '/shared', items: [{ label: 'Shared expenses', to: '/shared' }, { label: 'People', to: '/people' }, { label: 'Settlements', to: '/settlements' }] },
  { name: 'More', icon: Grid2X2, to: '/more', items: [{ label: 'Investments', to: '/investments' }, { label: 'Assets', to: '/assets' }, { label: 'Liabilities', to: '/liabilities' }, { label: 'Net worth', to: '/net-worth' }, { label: 'Documents', to: '/documents' }, { label: 'Notifications', to: '/notifications' }, { label: 'Settings', to: '/settings' }] },
] as const;

export function DesktopNavigation() {
  const { data } = useMoney();
  const path = useRouterState({ select: s => s.location.pathname });
  return <Sidebar variant="floating" collapsible="icon" className="money-sidebar"><SidebarHeader><Link to="/" className="money-brand"><span className="brand-symbol">m</span><span className="group-data-[collapsible=icon]:hidden">money os<span className="text-primary">.</span></span></Link></SidebarHeader><SidebarContent><SidebarMenu className="px-2"><SidebarMenuItem><SidebarMenuButton asChild tooltip="Home" isActive={path === '/'}><Link to="/"><Home/><span>Home</span></Link></SidebarMenuButton></SidebarMenuItem>{sections.map(group => <Collapsible key={group.name} defaultOpen={group.items.some(i => i.to === path)} className="group/nav"><SidebarMenuItem><div className="relative"><SidebarMenuButton asChild tooltip={group.name} isActive={group.items.some(i => i.to === path) || group.to === path}><Link to={group.to}><group.icon/><span>{group.name}</span></Link></SidebarMenuButton><CollapsibleTrigger asChild><SidebarMenuButton className="money-group-toggle group-data-[collapsible=icon]:hidden" aria-label={`Expand ${group.name}`}><ChevronDown className="group-data-[state=open]/nav:rotate-180"/></SidebarMenuButton></CollapsibleTrigger></div><CollapsibleContent><SidebarMenuSub>{group.items.map(i => <SidebarMenuSubItem key={i.to}><SidebarMenuSubButton asChild isActive={i.to === path}><Link to={i.to}>{i.label}</Link></SidebarMenuSubButton></SidebarMenuSubItem>)}</SidebarMenuSub></CollapsibleContent></SidebarMenuItem></Collapsible>)}</SidebarMenu></SidebarContent><SidebarFooter><SidebarTrigger aria-label="Toggle navigation"/><SidebarMenu><SidebarMenuItem><SidebarMenuButton asChild className="h-14" tooltip="Your profile"><Link to="/settings"><Avatar className="size-8 shrink-0"><AvatarImage src={profile} alt="Your profile"/><AvatarFallback>{data.profile.slice(0, 1)}</AvatarFallback></Avatar><span className="truncate">{data.profile}</span></Link></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarFooter></Sidebar>;
}
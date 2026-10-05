import { Children, isValidElement, useState, type ReactNode, type SelectHTMLAttributes, type ChangeEvent } from 'react';
import { CalendarDays, Check, ChevronsUpDown, LoaderCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandList, CommandItem } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

export function ResponsiveSurface({ open, onClose, title, description, children }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode }) {
  const mobile = useIsMobile();
  const change = (value: boolean) => { if (!value) onClose(); };
  const detail = description || 'Review your details before saving.';
  if (mobile) return <Sheet open={open} onOpenChange={change}><SheetContent side="bottom" className="money-mobile-sheet"><SheetHeader className="text-left pr-8"><SheetTitle>{title}</SheetTitle><SheetDescription>{detail}</SheetDescription></SheetHeader><div className="money-surface-body">{children}</div></SheetContent></Sheet>;
  return <Dialog open={open} onOpenChange={change}><DialogContent className="money-dialog"><DialogHeader className="pr-6"><DialogTitle>{title}</DialogTitle><DialogDescription>{detail}</DialogDescription></DialogHeader><div className="money-surface-body">{children}</div></DialogContent></Dialog>;
}

type Option = { value: string; label: string; disabled?: boolean };
function optionsFrom(children: ReactNode): Option[] {
  return Children.toArray(children).flatMap(child => {
    if (!isValidElement<{ value?: string; disabled?: boolean; children?: ReactNode }>(child)) return [];
    if (child.type === 'option') {
      const label = Children.toArray(child.props.children).join('');
      return [{ value: String(child.props.value ?? label), label, disabled: child.props.disabled }];
    }
    return optionsFrom(child.props.children);
  });
}

// Adapts existing controlled fields without changing their state or validation.
export function MoneySelect({ children, value, onChange, id, required, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  const [open, setOpen] = useState(false);
  const options = optionsFrom(children);
  const selected = options.find(option => option.value === value);
  const label = props['aria-label'] || id?.replaceAll('-', ' ') || 'Choose an option';
  const choose = (next: string) => { onChange?.({ target: { value: next } } as ChangeEvent<HTMLSelectElement>); setOpen(false); };
  const placeholder = options.find(option => option.value === '')?.label || 'Select an option';
  if (options.length > 6) return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button type="button" variant="outline" role="combobox" aria-expanded={open} aria-label={props['aria-label']} aria-required={required} id={id} disabled={props.disabled} className={`money-select ${className || ''}`}><span className="truncate">{selected?.label || placeholder}</span><ChevronsUpDown className="size-4 shrink-0 text-muted-foreground"/></Button></PopoverTrigger><PopoverContent className="money-combobox p-0" align="start"><Command><CommandInput aria-label={`Search ${label}`} placeholder="Search…"/><CommandList><CommandEmpty>No matches found.</CommandEmpty>{options.filter(o => o.value !== '').map(option => <CommandItem key={option.value} value={option.value} keywords={[option.label]} disabled={option.disabled} onSelect={() => choose(option.value)} className="min-h-11"><span className="flex-1">{option.label}</span>{option.value === value && <Check className="text-primary"/>}</CommandItem>)}</CommandList></Command></PopoverContent></Popover>;
  return <Select value={String(value || '')} onValueChange={choose} required={required} disabled={props.disabled}><SelectTrigger id={id} aria-label={props['aria-label']} className={`money-select ${className || ''}`}><SelectValue placeholder={placeholder}/></SelectTrigger><SelectContent>{options.filter(o => o.value !== '').map(option => <SelectItem key={option.value} value={option.value} disabled={option.disabled} className="min-h-11">{option.label}</SelectItem>)}</SelectContent></Select>;
}

export function MoneyDate({ id, value, onChange, required, label }: { id?: string; value: string; onChange: (value: string) => void; required?: boolean; label?: string }) {
  const [open, setOpen] = useState(false);
  const parsed = value ? parseISO(value) : undefined;
  const selected = parsed && !Number.isNaN(parsed.getTime()) ? parsed : undefined;
  return <Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button id={id} type="button" variant="outline" aria-label={label} aria-required={required} className="money-select"><span>{selected ? format(selected, 'd MMM yyyy') : 'Choose date'}</span><CalendarDays className="size-4 text-muted-foreground"/></Button></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={selected} defaultMonth={selected} onSelect={date => { if (date) { onChange(format(date, 'yyyy-MM-dd')); setOpen(false); } }}/>{!required && value && <Button type="button" variant="ghost" className="w-full" onClick={() => { onChange(''); setOpen(false); }}>Clear date</Button>}</PopoverContent></Popover>;
}

export function ConfirmAction({ open, onClose, title, description, action = 'Delete', onConfirm }: { open: boolean; onClose: () => void; title: string; description: string; action?: string; onConfirm: () => Promise<boolean | void> | boolean | void }) {
  const [busy, setBusy] = useState(false);
  return <AlertDialog open={open} onOpenChange={value => { if (!value && !busy) onClose(); }}><AlertDialogContent className="money-confirm"><AlertDialogHeader><AlertDialogTitle>{title}</AlertDialogTitle><AlertDialogDescription>{description}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel><Button variant="destructive" disabled={busy} onClick={async () => { setBusy(true); try { if (await onConfirm() !== false) onClose(); } finally { setBusy(false); } }}>{busy && <LoaderCircle className="animate-spin"/>}{action}</Button></AlertDialogFooter></AlertDialogContent></AlertDialog>;
}
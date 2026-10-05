import type { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function MoneyFormInput({ name, label, positive = false, ...props }: ComponentProps<typeof Input> & { name: string; label: string; positive?: boolean }) {
  const { control } = useFormContext();
  return <FormField control={control} name={name} rules={{ ...(props.required ? { required: `${label} is required.` } : {}), ...(positive ? { validate: value => Number(value) > 0 || 'Enter an amount greater than zero.' } : {}) }} render={({ field }) => <FormItem><FormLabel>{label}</FormLabel><FormControl><Input {...props} name={field.name} ref={field.ref} onBlur={field.onBlur} value={props.value ?? field.value ?? ''} onChange={event => { field.onChange(event); props.onChange?.(event); }}/></FormControl><FormMessage/></FormItem>}/>;
}
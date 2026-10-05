import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import type { Collection, MoneyData } from './types';
import { createDemo, createEmpty } from './demo';
import { connected, moneyService } from './service';
interface MoneyContextValue { data:MoneyData; demo:boolean; loading:boolean; error:string; online:boolean; reload:()=>void; save:<K extends Collection>(collection:K,item:MoneyData[K][number])=>Promise<boolean>; remove:(collection:Collection,id:string)=>Promise<void>; settings:(values:Partial<Pick<MoneyData,'currency'|'profile'|'categories'>>)=>Promise<void>; startFresh:()=>void; reset:()=>void }
const MoneyContext=createContext<MoneyContextValue|null>(null);
export function MoneyProvider({children}:{children:ReactNode}) { const [data,setData]=useState<MoneyData>(connected?createEmpty:createDemo); const [loading,setLoading]=useState(connected);const [error,setError]=useState('');const [online,setOnline]=useState(true);
 const reload=async()=>{if(!connected)return;setLoading(true);setError('');try{setData(await moneyService.load())}catch(e){setError(e instanceof Error?e.message:'Your data could not be loaded.')}finally{setLoading(false)}};
 useEffect(()=>{void reload();const on=()=>setOnline(navigator.onLine);on();window.addEventListener('online',on);window.addEventListener('offline',on);return()=>{window.removeEventListener('online',on);window.removeEventListener('offline',on)}},[]);
 const save=async<K extends Collection>(collection:K,item:MoneyData[K][number])=>{try{if(connected)await moneyService.save(collection,item);setData(previous=>{const items=previous[collection] as {id:string}[];return {...previous,[collection]:items.some(i=>i.id===item.id)?items.map(i=>i.id===item.id?item:i):[item,...items]}});toast.success(connected?'Saved':'Saved in this demo session');return true}catch(e){toast.error(e instanceof Error?e.message:'Could not save.');return false}};
 const remove=async(collection:Collection,id:string)=>{try{if(connected)await moneyService.remove(collection,id);setData(p=>({...p,[collection]:(p[collection] as {id:string}[]).filter(i=>i.id!==id)}));toast.success('Removed')}catch{toast.error('Could not remove this item. Try again.')}};
 const settings=async(values:Partial<Pick<MoneyData,'currency'|'profile'|'categories'>>)=>{try{if(connected)await moneyService.settings(values);setData(p=>({...p,...values}));toast.success('Preferences updated')}catch{toast.error('Could not update your preferences.')}};
 return <MoneyContext.Provider value={{data,demo:!connected,loading,error,online,reload,save,remove,settings,startFresh:()=>setData(createEmpty()),reset:()=>setData(createDemo())}}>{children}</MoneyContext.Provider> }
export function useMoney(){const value=useContext(MoneyContext);if(!value)throw new Error('MoneyProvider is required');return value}

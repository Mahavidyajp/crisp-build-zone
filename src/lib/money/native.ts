import type { NativeCapabilities } from './types';
const unavailable = async (): Promise<never> => { throw new Error('This feature needs the Money OS native integration.'); };
// A Capacitor host supplies platform implementations. Never persist financial data in localStorage.
let bridge: NativeCapabilities | undefined;
export function registerNativeCapabilities(capabilities:NativeCapabilities){bridge=capabilities}
export function nativeCapabilities():NativeCapabilities {
 if(bridge)return bridge;
 return { camera:unavailable,unlock:unavailable,secureStorage:{get:unavailable,set:unavailable},share:async(text)=>{if(navigator.share)await navigator.share({text});else throw new Error('Sharing is unavailable on this device.')},subscribeNetwork:listener=>{const on=()=>listener(navigator.onLine);window.addEventListener('online',on);window.addEventListener('offline',on);return()=>{window.removeEventListener('online',on);window.removeEventListener('offline',on)}} };
}

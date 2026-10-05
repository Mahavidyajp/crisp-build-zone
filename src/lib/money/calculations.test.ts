import { describe,it,expect } from 'vitest';
import { createEmpty } from './demo';
import { accountBalance, summary, equalSplit, findDuplicate, minor } from './calculations';
import type { Transaction } from './types';
const transaction:Transaction={id:'t1',name:'Food',amount:32000,category:'Food',accountId:'a',date:new Date().toISOString(),type:'Expense',status:'Confirmed'};
describe('financial integrity',()=>{
 it('stores money in minor units',()=>expect(minor('10.29')).toBe(1029));
 it('does not change the ledger for pending payments',()=>{const d=createEmpty();d.accounts=[{id:'a',name:'Bank',institution:'Bank',type:'Bank',opening:100000}];d.transactions=[{...transaction,status:'Pending'}];expect(summary(d).liquid).toBe(100000);expect(summary(d).spent).toBe(0)});
 it('transfers preserve total liquid money and are not expenses',()=>{const d=createEmpty();d.accounts=[{id:'a',name:'Bank',institution:'Bank',type:'Bank',opening:100000},{id:'b',name:'Cash',institution:'Cash',type:'Cash',opening:0}];d.transactions=[{...transaction,type:'Transfer',destinationId:'b'}];expect(summary(d).liquid).toBe(100000);expect(summary(d).spent).toBe(0)});
 it('settlements credit the receiving account without increasing expenses',()=>{const d=createEmpty();d.accounts=[{id:'a',name:'Cash',institution:'Cash',type:'Cash',opening:0}];d.transactions=[{...transaction,accountId:'external',destinationId:'a',type:'Settlement'}];expect(summary(d).liquid).toBe(32000);expect(summary(d).spent).toBe(0)});
 it('credit card purchase adds debt; repayment is not a second expense',()=>{const d=createEmpty();d.accounts=[{id:'a',name:'Bank',institution:'Bank',type:'Bank',opening:100000},{id:'card',name:'Card',institution:'Bank',type:'Credit Card',opening:0}];d.transactions=[{...transaction,accountId:'card'},{...transaction,id:'repay',type:'Transfer',destinationId:'card'}];expect(summary(d).spent).toBe(32000);expect(summary(d).liabilities).toBe(0);expect(summary(d).liquid).toBe(68000)});
 it('upcoming reduces spendable but not the bank balance',()=>{const d=createEmpty();d.accounts=[{id:'a',name:'Bank',institution:'Bank',type:'Bank',opening:100000}];d.recurring=[{id:'r',name:'Rent',amount:50000,date:new Date().toISOString().slice(0,10),frequency:'Monthly',accountId:'a',category:'Rent',reminder:true}];expect(summary(d).spendable).toBe(50000);expect(summary(d).liquid).toBe(100000)});
 it('investments never become spendable',()=>{const d=createEmpty();d.investments=[{id:'i',name:'Fund',kind:'ETF',amount:100000,current:120000}];expect(summary(d).netWorth).toBe(120000);expect(summary(d).spendable).toBe(0)});
 it('splits exactly preserve every minor unit',()=>{expect(equalSplit(100000,3)).toEqual([33334,33333,33333]);expect(equalSplit(100000,3).reduce((a,b)=>a+b,0)).toBe(100000)});
 it('detects same date merchant amount and external reference duplicates',()=>{expect(findDuplicate([transaction],{...transaction,id:'t2',name:' food '})).toBe(transaction);expect(findDuplicate([{...transaction,reference:'ref'}],{...transaction,id:'t2',reference:'ref',amount:1})).toBeDefined()});
});

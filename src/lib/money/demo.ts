import type { MoneyData } from './types';
const amount = (n: number) => n * 100;
export function createDemo(): MoneyData {
 const now=new Date(); const date=(offset:number)=>{ const d=new Date(now); d.setDate(d.getDate()+offset); return d.toISOString().slice(0,10) }; const tx=(id:string,name:string,n:number,category:string,offset:number,accountId='sbi',type:'Expense'|'Income'|'Payment'='Expense',status:'Confirmed'|'Needs Verification'='Confirmed')=>({id,name,amount:amount(n),category,date:date(offset)+'T12:00:00',accountId,type,status,method:accountId==='cash'?'Cash':'UPI'});
 return {
 profile:'Alex', currency:'INR', categories:['Food','Transport','Education','Shopping','Bills','Recharge','Entertainment','Health','Rent','Travel','Subscriptions','Family','Personal','Other'],
 accounts:[{id:'sbi',name:'Everyday savings',institution:'SBI',type:'Bank',opening:amount(22840)},{id:'hdfc',name:'Savings account',institution:'HDFC',type:'Bank',opening:amount(12500)},{id:'cash',name:'Cash wallet',institution:'Cash',type:'Cash',opening:amount(1800)}],
 transactions:[tx('t1','Blue Tokai Coffee',240,'Food',0),tx('t2','Uber ride',180,'Transport',0),tx('t3','Monthly salary',45000,'Other',-1,'hdfc','Income'),tx('t4','Fresh groceries',1240,'Food',-1),tx('t5','Netflix',649,'Subscriptions',-2),tx('t6','Dinner with roommates',900,'Food',-2,'cash'),tx('t7','Amazon',1899,'Shopping',-3),tx('t8','Electricity bill',1450,'Bills',-1,'sbi','Payment','Needs Verification')],
 budgets:[{id:'b1',name:'Food & groceries',category:'Food',amount:amount(6000)},{id:'b2',name:'Getting around',category:'Transport',amount:amount(2500)},{id:'b3',name:'Shopping',category:'Shopping',amount:amount(4000)}],
 goals:[{id:'g1',name:'Emergency fund',amount:amount(100000),current:amount(42000),date:date(180)},{id:'g2',name:'A little getaway',amount:amount(30000),current:amount(12000),date:date(90)}],
 recurring:[{id:'r1',name:'Monthly rent',amount:amount(8500),date:date(2),frequency:'Monthly',category:'Rent',accountId:'sbi',reminder:true},{id:'r2',name:'Spotify Premium',amount:amount(119),date:date(4),frequency:'Monthly',category:'Subscriptions',accountId:'sbi',reminder:true},{id:'r3',name:'Mobile recharge',amount:amount(299),date:date(6),frequency:'Monthly',category:'Recharge',accountId:'sbi',reminder:true}],
 people:[{id:'p1',name:'Jamie',relation:'Roommate'},{id:'p2',name:'Sam',relation:'Roommate'}], spaces:[{id:'sp1',name:'Our apartment',kind:'Roommates',memberIds:['p1','p2']}], settlements:[{id:'st1',name:'Jamie',amount:amount(300),paid:false,spaceId:'sp1',accountId:'cash'},{id:'st2',name:'Sam',amount:amount(300),paid:false,spaceId:'sp1',accountId:'cash'}],
 investments:[{id:'i1',name:'Nifty 50 Index Fund',kind:'Mutual Funds',amount:amount(35000),current:amount(38450)},{id:'i2',name:'Fixed deposit',kind:'Fixed Deposits',amount:amount(50000),current:amount(51800)}],
 assets:[{id:'as1',name:'Gold coin',kind:'Gold',amount:amount(28000),current:amount(32500),weight:5,purity:'24K'}], liabilities:[], documents:[],
 notifications:[{id:'n1',name:'Payment needs verification',detail:'Confirm the status of your electricity payment.',kind:'Payments',read:false},{id:'n2',name:'Rent is coming up',detail:'Your monthly rent is due in 2 days.',kind:'Recurring',read:false}]
 };
}
export function createEmpty(): MoneyData { const d=createDemo(); return {...d,profile:'You', accounts:[],transactions:[],budgets:[],goals:[],recurring:[],people:[],spaces:[],settlements:[],investments:[],assets:[],liabilities:[],notifications:[],documents:[]} }

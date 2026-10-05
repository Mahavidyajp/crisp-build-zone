import { createFileRoute } from '@tanstack/react-router';
import { AccountsView } from '@/components/money/views';
export const Route = createFileRoute('/accounts')({
 head: () => ({ meta: [{title:'Accounts — Money OS'},{name:'description',content:'Accounts in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Accounts — Money OS'},{property:'og:description',content:'Accounts in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <AccountsView/>,
});

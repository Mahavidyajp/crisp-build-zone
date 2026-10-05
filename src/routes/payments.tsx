import { createFileRoute } from '@tanstack/react-router';
import { PaymentsView } from '@/components/money/views';
export const Route = createFileRoute('/payments')({
 head: () => ({ meta: [{title:'Payments — Money OS'},{name:'description',content:'Payments in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Payments — Money OS'},{property:'og:description',content:'Payments in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <PaymentsView/>,
});

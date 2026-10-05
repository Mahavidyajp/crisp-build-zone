import { createFileRoute } from '@tanstack/react-router';
import { NetWorthView } from '@/components/money/views';
export const Route = createFileRoute('/net-worth')({
 head: () => ({ meta: [{title:'Net worth — Money OS'},{name:'description',content:'Net worth in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Net worth — Money OS'},{property:'og:description',content:'Net worth in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <NetWorthView/>,
});

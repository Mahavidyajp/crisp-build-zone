import { createFileRoute } from '@tanstack/react-router';
import { WealthView } from '@/components/money/views';
export const Route = createFileRoute('/liabilities')({
 head: () => ({ meta: [{title:'Liabilities — Money OS'},{name:'description',content:'Liabilities in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Liabilities — Money OS'},{property:'og:description',content:'Liabilities in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <WealthView collection="liabilities"/>,
});

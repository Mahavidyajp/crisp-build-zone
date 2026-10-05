import { createFileRoute } from '@tanstack/react-router';
import { WealthView } from '@/components/money/views';
export const Route = createFileRoute('/investments')({
 head: () => ({ meta: [{title:'Investments — Money OS'},{name:'description',content:'Investments in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Investments — Money OS'},{property:'og:description',content:'Investments in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <WealthView collection="investments"/>,
});

import { createFileRoute } from '@tanstack/react-router';
import { WealthView } from '@/components/money/views';
export const Route = createFileRoute('/assets')({
 head: () => ({ meta: [{title:'Assets — Money OS'},{name:'description',content:'Assets in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Assets — Money OS'},{property:'og:description',content:'Assets in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <WealthView collection="assets"/>,
});

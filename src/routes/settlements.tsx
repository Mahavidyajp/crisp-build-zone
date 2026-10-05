import { createFileRoute } from '@tanstack/react-router';
import { SharedView } from '@/components/money/views';
export const Route = createFileRoute('/settlements')({
 head: () => ({ meta: [{title:'Settlements — Money OS'},{name:'description',content:'Settlements in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Settlements — Money OS'},{property:'og:description',content:'Settlements in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <SharedView view="Settlements"/>,
});

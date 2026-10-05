import { createFileRoute } from '@tanstack/react-router';
import { ActivityView } from '@/components/money/views';
export const Route = createFileRoute('/activity')({
 head: () => ({ meta: [{title:'Activity — Money OS'},{name:'description',content:'Activity in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Activity — Money OS'},{property:'og:description',content:'Activity in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <ActivityView/>,
});

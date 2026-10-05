import { createFileRoute } from '@tanstack/react-router';
import { SharedView } from '@/components/money/views';
export const Route = createFileRoute('/people')({
 head: () => ({ meta: [{title:'People — Money OS'},{name:'description',content:'People in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'People — Money OS'},{property:'og:description',content:'People in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <SharedView view="People"/>,
});

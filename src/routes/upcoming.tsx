import { createFileRoute } from '@tanstack/react-router';
import { RecurringView } from '@/components/money/views';
export const Route = createFileRoute('/upcoming')({
 head: () => ({ meta: [{title:'Upcoming — Money OS'},{name:'description',content:'Upcoming in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Upcoming — Money OS'},{property:'og:description',content:'Upcoming in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <RecurringView upcoming/>,
});

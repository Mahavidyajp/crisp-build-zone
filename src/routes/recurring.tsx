import { createFileRoute } from '@tanstack/react-router';
import { RecurringView } from '@/components/money/views';
export const Route = createFileRoute('/recurring')({
 head: () => ({ meta: [{title:'Recurring — Money OS'},{name:'description',content:'Recurring in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Recurring — Money OS'},{property:'og:description',content:'Recurring in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <RecurringView/>,
});

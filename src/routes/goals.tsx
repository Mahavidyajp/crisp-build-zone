import { createFileRoute } from '@tanstack/react-router';
import { GoalsView } from '@/components/money/views';
export const Route = createFileRoute('/goals')({
 head: () => ({ meta: [{title:'Goals — Money OS'},{name:'description',content:'Goals in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Goals — Money OS'},{property:'og:description',content:'Goals in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <GoalsView/>,
});

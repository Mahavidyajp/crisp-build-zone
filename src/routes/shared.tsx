import { createFileRoute } from '@tanstack/react-router';
import { SharedView } from '@/components/money/views';
export const Route = createFileRoute('/shared')({
 head: () => ({ meta: [{title:'Shared money — Money OS'},{name:'description',content:'Shared money in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Shared money — Money OS'},{property:'og:description',content:'Shared money in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <SharedView/>,
});

import { createFileRoute } from '@tanstack/react-router';
import { DocumentsView } from '@/components/money/views';
export const Route = createFileRoute('/documents')({
 head: () => ({ meta: [{title:'Documents — Money OS'},{name:'description',content:'Documents in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Documents — Money OS'},{property:'og:description',content:'Documents in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <DocumentsView/>,
});

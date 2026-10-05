import { createFileRoute } from '@tanstack/react-router';
import { DirectoryView } from '@/components/money/views';
export const Route = createFileRoute('/plan')({
 head: () => ({ meta: [{title:'Plan — Money OS'},{name:'description',content:'Plan in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Plan — Money OS'},{property:'og:description',content:'Plan in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <DirectoryView plan/>,
});

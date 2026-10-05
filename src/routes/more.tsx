import { createFileRoute } from '@tanstack/react-router';
import { DirectoryView } from '@/components/money/views';
export const Route = createFileRoute('/more')({
 head: () => ({ meta: [{title:'More — Money OS'},{name:'description',content:'More in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'More — Money OS'},{property:'og:description',content:'More in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <DirectoryView/>,
});

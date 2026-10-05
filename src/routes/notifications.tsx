import { createFileRoute } from '@tanstack/react-router';
import { NotificationsView } from '@/components/money/views';
export const Route = createFileRoute('/notifications')({
 head: () => ({ meta: [{title:'Notifications — Money OS'},{name:'description',content:'Notifications in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Notifications — Money OS'},{property:'og:description',content:'Notifications in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <NotificationsView/>,
});

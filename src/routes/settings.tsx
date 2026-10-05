import { createFileRoute } from '@tanstack/react-router';
import { SettingsView } from '@/components/money/views';
export const Route = createFileRoute('/settings')({
 head: () => ({ meta: [{title:'Settings — Money OS'},{name:'description',content:'Settings in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Settings — Money OS'},{property:'og:description',content:'Settings in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <SettingsView/>,
});

import { createFileRoute } from '@tanstack/react-router';
import { BudgetsView } from '@/components/money/views';
export const Route = createFileRoute('/budgets')({
 head: () => ({ meta: [{title:'Budgets — Money OS'},{name:'description',content:'Budgets in Money OS. Personal and household finances, clearly organized.'},{property:'og:title',content:'Budgets — Money OS'},{property:'og:description',content:'Budgets in Money OS. Personal and household finances, clearly organized.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: () => <BudgetsView/>,
});

import { createFileRoute } from '@tanstack/react-router';
import { HomeView } from '@/components/money/home';
export const Route = createFileRoute('/')({
 head: () => ({ meta: [{title:'Home — Money OS'},{name:'description',content:'Your spendable money, upcoming payments, and everyday activity. A clear picture of your personal finances.'},{property:'og:title',content:'Home — Money OS'},{property:'og:description',content:'Your money, made clear. Spendable balances, upcoming payments, and everyday activity.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }),
 component: HomeView,
});

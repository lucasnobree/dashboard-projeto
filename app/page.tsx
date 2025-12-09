// app/page.tsx
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { SalesChart } from './components/SalesChart';
import { CampaignTable } from './components/CampaignTable';
import { supabase } from '../lib/supabaseClient';

async function getData() {
  const { data: traffic } = await supabase
    .from('traffic_events')
    .select('clicks, visits');

  const totalClicks = traffic?.reduce((acc, cur) => acc + (cur.clicks || 0), 0) ?? 0;
  const totalVisits = traffic?.reduce((acc, cur) => acc + (cur.visits || 0), 0) ?? 0;

  const { data: sales } = await supabase
    .from('sales')
    .select('sale_date, amount')
    .order('sale_date', { ascending: true });

  const salesChartData =
    sales?.map((s) => ({
      date: new Date(s.sale_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      }),
      amount: Number(s.amount),
    })) ?? [];

  const totalRevenue =
    sales?.reduce((acc, cur) => acc + Number(cur.amount || 0), 0) ?? 0;

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, name, clicks, visits, conversions, revenue')
    .order('revenue', { ascending: false });

  return {
    totalClicks,
    totalVisits,
    totalRevenue,
    salesChartData,
    campaigns: campaigns ?? [],
  };
}

export default async function Page() {
  const {
    totalClicks,
    totalVisits,
    totalRevenue,
    salesChartData,
    campaigns,
  } = await getData();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6">
        <StatsCards
          totalClicks={totalClicks}
          totalVisits={totalVisits}
          totalRevenue={totalRevenue}
        />

        <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
          <SalesChart data={salesChartData} />
          <CampaignTable campaigns={campaigns} />
        </div>
      </main>
    </div>
  );
}

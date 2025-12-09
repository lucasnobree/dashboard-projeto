// app/components/StatsCards.tsx
type StatsCardsProps = {
    totalClicks: number;
    totalVisits: number;
    totalRevenue: number;
  };
  
  export function StatsCards({ totalClicks, totalVisits, totalRevenue }: StatsCardsProps) {
    const ctr = totalVisits > 0 ? (totalClicks / totalVisits) * 100 : 0;
  
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
          <p className="text-xs font-medium text-sky-700 uppercase tracking-wide">
            Cliques
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{totalClicks}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
          <p className="text-xs font-medium text-sky-700 uppercase tracking-wide">
            Visitas
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{totalVisits}</p>
          <p className="mt-1 text-xs text-sky-700">
            CTR: {ctr.toFixed(1)}%
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
          <p className="text-xs font-medium text-sky-700 uppercase tracking-wide">
            Receita total
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            R$ {totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }
  
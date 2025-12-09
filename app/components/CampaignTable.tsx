// app/components/CampaignTable.tsx
type Campaign = {
    id: number;
    name: string;
    clicks: number;
    visits: number;
    conversions: number;
    revenue: number;
  };
  
  type CampaignTableProps = {
    campaigns: Campaign[];
  };
  
  export function CampaignTable({ campaigns }: CampaignTableProps) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
        <h2 className="mb-4 text-sm font-semibold text-sky-800">
          Desempenho por campanha
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-sky-100/80 text-xs uppercase text-sky-900">
              <tr>
                <th className="px-3 py-2">Campanha</th>
                <th className="px-3 py-2">Cliques</th>
                <th className="px-3 py-2">Visitas</th>
                <th className="px-3 py-2">Conversões</th>
                <th className="px-3 py-2">Receita</th>
              </tr>
            </thead>
            <tbody className="text-slate-800">
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="border-b last:border-none hover:bg-sky-50 transition-colors"
                >
                  <td className="px-3 py-2 font-medium text-slate-900">{c.name}</td>
                  <td className="px-3 py-2">{c.clicks}</td>
                  <td className="px-3 py-2">{c.visits}</td>
                  <td className="px-3 py-2">{c.conversions}</td>
                  <td className="px-3 py-2">
                    R$ {c.revenue.toFixed(2)}
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-4 text-center text-sky-700"
                  >
                    Nenhuma campanha cadastrada ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
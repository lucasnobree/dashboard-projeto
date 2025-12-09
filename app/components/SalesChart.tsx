// app/components/SalesChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type SalesPoint = {
  date: string;
  amount: number;
};

type SalesChartProps = {
  data: SalesPoint[];
};

export function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
      <h2 className="mb-4 text-sm font-semibold text-sky-800">
        Evolução das vendas
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#0f172a" />
            <YAxis stroke="#0f172a" />
            <Tooltip
              contentStyle={{ borderRadius: 8, borderColor: '#38bdf8' }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#0284c7" // azul
              strokeWidth={2}
              dot={{ r: 3, stroke: '#0ea5e9', strokeWidth: 1 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

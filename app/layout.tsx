// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel Digital',
  description: 'Dashboard simples de cliques, visitas e vendas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-sky-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}

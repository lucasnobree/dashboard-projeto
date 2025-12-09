// app/admin/page.tsx
'use client';

import { useState } from 'react';

export default function AdminPage() {
    const [trafficLoading, setTrafficLoading] = useState(false);
    const [salesLoading, setSalesLoading] = useState(false);
    const [campaignLoading, setCampaignLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function handleTrafficSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage(null);
        setTrafficLoading(true);

        const formData = new FormData(e.currentTarget);
        const body = {
            event_date: formData.get('event_date'),
            clicks: formData.get('clicks'),
            visits: formData.get('visits'),
        };

        const res = await fetch('/api/traffic', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setTrafficLoading(false);

        if (!res.ok) {
            setMessage(`Erro ao salvar tráfego: ${data.error || 'Verifique os dados.'}`);
        } else {
            setMessage('✅ Dados de tráfego salvos com sucesso!');
            e.currentTarget.reset();
        }
    }

    async function handleSalesSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage(null);
        setSalesLoading(true);

        const formData = new FormData(e.currentTarget);
        const body = {
            sale_date: formData.get('sale_date'),
            amount: formData.get('amount'),
        };

        const res = await fetch('/api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setSalesLoading(false);

        if (!res.ok) {
            setMessage(`Erro ao salvar venda: ${data.error || 'Verifique os dados.'}`);
        } else {
            setMessage('✅ Venda salva com sucesso!');
            e.currentTarget.reset();
        }
    }

    async function handleCampaignSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage(null);
        setCampaignLoading(true);

        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name'),
            clicks: formData.get('clicks'),
            visits: formData.get('visits'),
            conversions: formData.get('conversions'),
            revenue: formData.get('revenue'),
        };

        const res = await fetch('/api/campaigns', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        setCampaignLoading(false);

        if (!res.ok) {
            setMessage(`Erro ao salvar campanha: ${data.error || 'Verifique os dados.'}`);
        } else {
            setMessage('✅ Campanha salva com sucesso!');
            e.currentTarget.reset();
        }
    }

    return (
        <div className="min-h-screen bg-sky-50 px-4 py-6">
            <div className="mx-auto max-w-3xl">
                <div className="mb-6 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 p-5 shadow-md">
                    <h1 className="mb-1 text-2xl font-semibold text-white">
                        Admin – Atualizar dados do painel
                    </h1>
                    <p className="text-sm text-sky-100">
                        Preencha os formulários abaixo para enviar dados de tráfego, vendas e campanhas.
                    </p>
                </div>

                {message && (
                    <div className="mb-4 rounded-md bg-sky-100 px-3 py-2 text-sm text-sky-900 border border-sky-300">
                        {message}
                    </div>
                )}

                {/* Tráfego */}
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
                    <h2 className="mb-3 text-sm font-semibold text-sky-800">
                        1. Dados de cliques e visitas (por dia)
                    </h2>
                    <form onSubmit={handleTrafficSubmit} className="grid gap-3 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Data
                            </label>
                            <input
                                type="date"
                                name="event_date"
                                required
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Cliques
                            </label>
                            <input
                                type="number"
                                name="clicks"
                                min={0}
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Visitas
                            </label>
                            <input
                                type="number"
                                name="visits"
                                min={0}
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div className="md:col-span-4">
                            <button
                                type="submit"
                                disabled={trafficLoading}
                                className="mt-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                            >
                                {trafficLoading ? 'Salvando...' : 'Salvar dados de tráfego'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Vendas */}
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
                    <h2 className="mb-3 text-sm font-semibold text-sky-800">
                        2. Registro de vendas
                    </h2>
                    <form onSubmit={handleSalesSubmit} className="grid gap-3 md:grid-cols-3">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Data da venda
                            </label>
                            <input
                                type="date"
                                name="sale_date"
                                required
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Valor (R$)
                            </label>
                            <input
                                type="number"
                                name="amount"
                                step="0.01"
                                min={0}
                                required
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={salesLoading}
                                className="w-full rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                            >
                                {salesLoading ? 'Salvando...' : 'Salvar venda'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Campanhas */}
                <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-sky-100">
                    <h2 className="mb-3 text-sm font-semibold text-sky-800">
                        3. Desempenho por campanha
                    </h2>
                    <form onSubmit={handleCampaignSubmit} className="grid gap-3 md:grid-cols-5">
                        <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Nome da campanha
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Cliques
                            </label>
                            <input
                                type="number"
                                name="clicks"
                                min={0}
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Visitas
                            </label>
                            <input
                                type="number"
                                name="visits"
                                min={0}
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Conversões
                            </label>
                            <input
                                type="number"
                                name="conversions"
                                min={0}
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-medium text-sky-800">
                                Receita (R$)
                            </label>
                            <input
                                type="number"
                                name="revenue"
                                step="0.01"
                                min={0}
                                className="w-full rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-sm text-gray-900 focus:border-sky-500 focus:outline-none"
                            />
                        </div>
                        <div className="md:col-span-5">
                            <button
                                type="submit"
                                disabled={campaignLoading}
                                className="mt-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-60"
                            >
                                {campaignLoading ? 'Salvando...' : 'Salvar campanha'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

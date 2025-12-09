// app/api/campaigns/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
    try {
        const { name, clicks, visits, conversions, revenue } = await req.json();

        const { error } = await supabase.from('campaigns').insert({
            name,
            clicks: Number(clicks) || 0,
            visits: Number(visits) || 0,
            conversions: Number(conversions) || 0,
            revenue: Number(revenue) || 0,
        });

        if (error) {
            console.error(error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? 'Erro ao salvar campanha.' },
            { status: 500 }
        );
    }
}

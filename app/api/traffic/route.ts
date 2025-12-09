// app/api/traffic/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
    try {
        const { event_date, clicks, visits } = await req.json();

        const { error } = await supabase.from('traffic_events').insert({
            event_date,
            clicks: Number(clicks) || 0,
            visits: Number(visits) || 0,
        });

        if (error) {
            console.error(error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? 'Erro ao salvar dados de tráfego.' },
            { status: 500 }
        );
    }
}

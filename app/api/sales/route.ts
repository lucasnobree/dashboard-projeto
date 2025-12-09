// app/api/sales/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
    try {
        const { sale_date, amount } = await req.json();

        const { error } = await supabase.from('sales').insert({
            sale_date,
            amount: Number(amount) || 0,
        });

        if (error) {
            console.error(error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json(
            { error: e?.message ?? 'Erro ao salvar venda.' },
            { status: 500 }
        );
    }
}

import { Plano } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read All
export async function GET () {
    try{    
        const planos = await Plano.findAll();
        return NextResponse.json(planos);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { nome_plano, preco_plano, duracao_dias, limite_conversoes } = body;
        const plano = await Plano.create({ nome_plano, preco_plano, duracao_dias, limite_conversoes });
        return NextResponse.json(plano); 
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

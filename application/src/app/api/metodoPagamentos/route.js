import { MetodoPagamento } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Create

export async function POST () {
    try {    
        const body = await req.json();
        const { nome_metodo_pagamento } = body;

        const metodoPagamento = await MetodoPagamento.create({ nome_metodo_pagamento });
        return NextResponse.json(metodoPagamento);
    } catch (err) {
        return NextResponse.json({error: err.message}, {status: 500});
    }
}


// Read All

export async function GET () {
    try {    
        const metodoPagamentos = await MetodoPagamento.findAll();
        return NextResponse.json(metodoPagamentos);
    } catch (err) {
        return NextResponse.json({error: err.message}, {status: 500});
    }
}
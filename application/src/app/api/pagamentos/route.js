import { Pagamento } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Create

export async function POST () {
    try {    
        const body = await req.json();
        const { data_pagamento, valor_pagamento, status_pagamento } = body;

        const pagamento = await Pagamento.create({ data_pagamento, valor_pagamento, status_pagamento });
        return NextResponse.json(pagamento);
    } catch (err) {
        return NextResponse.json({error: err.message}, {status: 500});
    }
}


// Read All

export async function GET () {
    try {    
        const pagamentos = await Pagamento.findAll();
        return NextResponse.json(pagamentos);
    } catch (err) {
        return NextResponse.json({error: err.message}, {status: 500});
    }
}
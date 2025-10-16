import { Assinatura } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Create

export async function POST (req) {
    try {    
        const body = await req.json();
        const { data_inicio, data_fim, status_assinatura } = body;

        const assinatura = await Assinatura.create({ data_inicio, data_fim, status_assinatura });
        return NextResponse.json(assinatura);
    } catch (err) {
        console.error("Error sequelize: ", err);
        return NextResponse.json({error: err.message}, {status: 500});
    }
}


// Read All

export async function GET () {
    try {    
        const assinaturas = await Assinatura.findAll();
        return NextResponse.json(assinaturas);
    } catch (err) {
        return NextResponse.json({error: err.message}, {status: 500});
    }
}
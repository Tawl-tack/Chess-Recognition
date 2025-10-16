import { Plano } from "../../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read By ID
export async function GET (req, { params }) {
    const { id } = params;
    const plano = await Plano.findByPk(id);
    if (!plano) return NextResponse.json({error: "Plano not found"}, { status: 404 });
    return NextResponse.json(plano);
} 

// Update
export async function PUT (req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { nome_plano, preco_plano, duracao_dias, limite_conversoes } = body;
    
    const [updated] = await Plano.update({ nome_plano, preco_plano, duracao_dias, limite_conversoes }, {where: { id }});
    if (!updated) return NextResponse.json({error: "Plano not found"}, {status: 404});
    
    const plano = await Plano.findByPk(id);
    return NextResponse.json(plano);
}

// Delete

export async function DELETE (req, { params }) {
    const { id } = params;
    const [deleted] = await Plano.destroy();
    if (!deleted) return NextResponse.json({error: "Plano not found"}, {status: 404});
    return new NextResponse(null, {status: 204});
}
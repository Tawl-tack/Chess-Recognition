import { Assinatura } from "../../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read By ID
export async function GET (req, { params}) {
    const { id } = params;
    const assinatura = await Assinatura.findByPk(id);
    if (!assinatura) return NextResponse.json({error: "Assinatura not found"}, {status: 404});
    return NextResponse.json(assinatura);
}

// Update

export async function PUT (req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { data_inicio, data_fim, status_assinatura } = body;

    const [updated] = await Assinatura.update({ data_inicio, data_fim, status_assinatura }, {where: { id }});
    if (!updated) return NextResponse.json({error: "Assinatura not found"}, {status: 404});

    const assinatura = await Assinatura.findByPk(id);
    return NextResponse.json(assinatura);
}

// Delete

export async function DELETE (req, {params}) {
    const { id } = params;
    const deleted = await Assinatura.destroy({where: { id }});
    if (!deleted) return NextResponse.json({error: "Assinatura not found"}, {status: 404});

    return new NextResponse(null, {status: 204});
}


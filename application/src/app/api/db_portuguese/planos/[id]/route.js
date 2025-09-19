import { Plano } from "@/app/database/models/tables";

// Read By ID
export default async function GET (req, { params }) {
    const { id } = params;
    const plano = await Plano.findByPk(id);
    if (!plano) return new Response({error: "Plano not found"}, { status: 404 });
    return Response.json(plano);
} 

// Update
export default async function PUT (req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { nome_plano, preco_plano, duracao_dias, limite_conversoes } = body;
    
    const [updated] = await Plano.update({ nome_plano, preco_plano, duracao_dias, limite_conversoes }, {where: { id }});
    if (!updated) return Response.json({error: "Plano not found"}, {status: 404});
    
    const plano = await Plano.findByPk(id);
    return Response.json(plano);
}

// Delete

export default async function DELETE (req, { params }) {
    const { id } = params;
    const [deleted] = await Plano.destroy();
    if (!deleted) return Response.json({error: "Plano not found"}, {status: 404});
    return new Response(null, {status: 204});
}
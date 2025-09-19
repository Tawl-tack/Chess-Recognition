import { Plano } from "@/app/database/models/tables";

// Read All
export default async function GET () {
    try{    
        const planos = await Plano.findAll();
        return Response.json(planos);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

// Create
export default async function POST (req) {
    try{
        const body = await req.json();
        const { nome_plano, preco_plano, duracao_dias, limite_conversoes } = body;
        const plano = await Plano.create({ nome_plano, preco_plano, duracao_dias, limite_conversoes });
        return Response.json(plano); 
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

import { Usuario } from "@/app/database/models/tables";

// Read all
export async function GET () {
    try{    
        const usuarios = await Usuario.findAll();
        return Response.json(usuarios);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500});
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { nome, email, senha } = body;

        const usuario = await Usuario.create({ nome, email, senha });
        return Response.json(usuario);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500});
    }
}
import { Usuario } from "@/app/database/models/tables";

// Read by ID
export async function GET(req, { params }) {
    const { id } = params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return new Response({ error: 'Usuario not found'}, { status: 404});
    return Response.json(usuario);
}

// Update
export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { nome, email, senha } = body;

    const [updated] = await Usuario.update({ nome, email, senha }, { where: { id }});
    if (!updated) return Response.json({ error: 'Usuario not found'}, { status: 404 });

    const usuario = await Usuario.findByPk(id);
    return Response.json(usuario);
}

// Delete
export async function DELETE(req, { params }) {
    const { id } = params;
    const deleted = await Usuario.destroy({ where: { id }});
    if (!deleted) return Response.json({ error: "Usuario not found"}, { status: 404});
    return new Response(null, { status: 204 });
}
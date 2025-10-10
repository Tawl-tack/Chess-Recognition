import { Usuario } from "../../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read by ID
export async function GET(req, { params }) {
    const { id } = params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return NextResponse.json({ error: 'Usuario not found'}, { status: 404});
    return NextResponse.json(usuario);
}

// Update
export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { nome, email, senha } = body;

    const [updated] = await Usuario.update({ nome, email, senha }, { where: { id }});
    if (!updated) return NextResponse.json({ error: 'Usuario not found'}, { status: 404 });

    const usuario = await Usuario.findByPk(id);
    return NextResponse.json(usuario);
}

// Delete
export async function DELETE(req, { params }) {
    const { id } = params;
    const deleted = await Usuario.destroy({ where: { id }});
    if (!deleted) return NextResponse.json({ error: "Usuario not found"}, { status: 404});
    return new NextResponse(null, { status: 204 });
}
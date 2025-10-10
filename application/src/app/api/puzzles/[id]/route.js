import { Puzzle } from "../../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read by ID
export async function GET(req, { params }) {
    const { id } = params;
    const puzzle = await Puzzle.findByPk(id);
    if (!puzzle) return NextResponse.json({ error: 'Puzzle not found'}, { status: 404});
    return NextResponse.json(puzzle);
}

// Update
export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();
    const { fen_inicial, movimento_correto, dificuldade } = body;

    const [updated] = await Puzzle.update({ fen_inicial, movimento_correto, dificuldade }, { where: { id }});
    if (!updated) return NextResponse.json({ error: 'Puzzle not found'}, { status: 404 });

    const puzzle = await Puzzle.findByPk(id);
    return NextResponse.json(puzzle);
}

// Delete
export async function DELETE(req, { params }) {
    const { id } = params;
    const deleted = await Puzzle.destroy({ where: { id }});
    if (!deleted) return NextResponse.json({ error: "Puzzle not found"}, { status: 404});
    return new NextResponse(null, { status: 204 });
}
import { Puzzle } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read all
export async function GET () {
    try{    
        const puzzles = await Puzzle.findAll();
        return NextResponse.json(puzzles);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { fen_inicial, movimento_correto, dificuldade } = body;

        const puzzle = await Puzzle.create({ fen_inicial, movimento_correto, dificuldade });
        return NextResponse.json(puzzle);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}
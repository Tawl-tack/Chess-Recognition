import { Puzzle } from "@/app/database/models/tables";
import { NextResponse } from "next/server";

// Read all
export async function GET () {
    try{    
        const puzzles = await Puzzle.findAll();
        return NextResponse.json(Puzzles);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { nome, email, senha } = body;

        const puzzle = await Puzzle.create({ nome, email, senha });
        return NextResponse.json(Puzzle);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}
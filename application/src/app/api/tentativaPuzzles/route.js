import { TentativaPuzzle } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read all
export async function GET () {
    try{    
        const tentativaPuzzles = await TentativaPuzzle.findAll();
        return NextResponse.json(tentativaPuzzles);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { resposta_usuario, correta } = body;

        const tentativaPuzzle = await TentativaPuzzle.create({ resposta_usuario, correta });
        return NextResponse.json(tentativaPuzzle);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}
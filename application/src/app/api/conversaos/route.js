import { Conversao } from "../../../../database/models/tables";
import { NextResponse } from "next/server";

// Read all
export async function GET () {
    try{    
        const conversaos = await Conversao.findAll();
        return NextResponse.json(conversaos);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { fen_gerado, precisao } = body;

        const conversao = await Conversao.create({ fen_gerado, precisao });
        return NextResponse.json(conversao);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}
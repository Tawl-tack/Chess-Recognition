import { Usuario } from "@/app/database/models/tables";
import { NextResponse } from "next/server";

// Read all
export async function GET () {
    try{    
        const usuarios = await Usuario.findAll();
        return NextResponse.json(usuarios);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}

// Create
export async function POST (req) {
    try{
        const body = await req.json();
        const { nome, email, senha } = body;

        const usuario = await Usuario.create({ nome, email, senha });
        return NextResponse.json(usuario);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500});
    }
}
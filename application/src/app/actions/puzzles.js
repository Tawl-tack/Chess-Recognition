"use server";

import { redirect } from "next/navigation";

export default async function createPuzzle(formData) {

    const fen_inicial = formData.get("fen_inicial");
    const movimento_correto = formData.get("movimento_correto");
    const dificuldade = formData.get("dificuldade");

    // Create a general URL
    const apiURL = "http://localhost:3000/api/puzzles/"

    // Consome no CRUD
    const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen_inicial, movimento_correto, dificuldade })
    });

    // Error traited
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error creating Puzzle");
    }

    // Volta para a lista de usuários
    redirect('/puzzles');
}
"use server";

import { redirect } from "next/navigation";

export default async function createPlano (formData) {
    const nome_plano = formData.get("nome_plano");
    const preco_plano = formData.get("preco_plano");
    const duracao_dias = formData.get("duracao_dias");
    const limite_conversoes = formData.get("limite_conversoes");

    // Create a general URL
    const apiURL = "http://localhost:3000/api/planos/";

    // Consome no CRUD
    const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_plano, preco_plano, duracao_dias, limite_conversoes })
    });

    console.log(res);

    // Error traited
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error creating Plano");
    }

    // Come back to /planos
    redirect('/planos');
}
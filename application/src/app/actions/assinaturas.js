"use server";

import { redirect } from "next/navigation";

export default async function createAssinatura(formData) {

    const data_inicio = formData.get("data_inicio");
    const data_fim = formData.get("data_fim");
    const status_assinatura = formData.get("status_assinatura");

    // Create a general URL
    const apiURL = "http://localhost:3000/api/assinaturas/"

    // Consome no CRUD
    const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data_inicio, data_fim, status_assinatura })
    });

    console.log(res);

    // Error traited
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error creating Assinatura");
    }

    // Volta para a lista de usuários
    redirect('/assinaturas');
}
"use server";

import { redirect } from "next/navigation";

export default async function createUsuario(formData) {

    const nome = formData.get("nome");
    const email = formData.get("email");
    const senha = formData.get("senha");

    // Create a general URL
    const apiURL = "http://localhost:3000/api/usuarios/"

    // Consome no CRUD
    const res = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    });

    // Error traited
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error creating Usuario");
    }

    // Volta para a lista de usuários
    redirect('/usuarios');
}
import { NextResponse } from "next/server";

export async function POST (req) {
    const formData = await req.formData();
    const imageFile = formData.get('image');

    const fastApiFormData = new FormData();
    fastApiFormData.append('file', imageFile);

    const fastApiResponse = await fetch('http://fastapi:8000/convert/', {
        method: 'POST',
        body: fastApiFormData,
    });

    const data = await fastApiResponse.json();

    console.log(data);

    return NextResponse.json(data);
}

// Esse arquivo recebe a imagem do frontend e manda ela para o Fast API esperando a resposta, depois que recebe a resposta ele envia para o front denovo
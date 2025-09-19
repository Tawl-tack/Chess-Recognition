"use client"

import { useState } from "react";
import { Chessboard } from "react-chessboard";

export default function Upload_Image () {
    const [ file, setFile ] = useState(null);
    const [ result, setResult ] = useState(null);

    const handle_change = (e) => {
        if (e.target.files) setFile(e.target.files[0]);
    }

    const handle_submit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch('/api/convert_img', {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setResult(data);
    }

    const showBoard = () => {
        return (
            <Chessboard position={result.fen} />
        );
    }

    return (
        <div>
            <h1>Envie a imagem aqui para converte-la</h1>
            <input type="file" onChange={handle_change} />
            {file && <p>Arquivo: {file.name}</p>} <br />
            <button onClick={handle_submit}>Converter</button>
            {result && <p>Resultado: {result.fen}</p>}
            <br/>
        </div>
    );
}
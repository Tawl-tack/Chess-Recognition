"use client"

import { useState } from "react";
import Load_chessboard from "./load_chessboard";

export default function Upload_Image () {
    const [ file, setFile ] = useState(null);
    const [ fen, setFen ] = useState(null);

    const handle_change = (e) => {
        if (e.target.files) setFile(e.target.files[0]);
    }

    const handle_submit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch('/api/fastapi/convert', {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setFen(data.fen);
        


    }

    return (
        <div>
            <h2>Envie a imagem aqui para converte-la</h2>
            <input type="file" onChange={handle_change} />
            {file && <p>Arquivo: {file.name}</p>} <br />
            <button onClick={handle_submit}>Converter</button>
            {fen && <p>Resultado: {fen}</p>}
            <div style={{width: '400px'}}>
            {fen && <Load_chessboard fen={fen} />}
            </div>
            <br/>
        </div>
    );
}
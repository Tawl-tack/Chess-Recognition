"use client"

import { useState } from "react";
import Load_chessboard from "./load_chessboard";

export default function Upload_Image() {
    const [file, setFile] = useState(null);
    const [fen, setFen] = useState(null);
    const [preview, setPreview] = useState(null);

    const handle_change = (e) => {
        const selectedFile = e.target.files[0];

        if (e.target.files) {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(selectedFile));
        }
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
        <div className="flex flex-col items-center gap-5">
            {/* <h2 className="text-2xl text-white">Image to Chessboard Converter</h2> */}
            <h1 className="pb-1 text-4xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-t from-[#00d7d2] to-[#8e72ee] text-center mt-8">
                Image to Chessboard Converter
            </h1>
            <h2 className="text-white">High precision in low time</h2>
            <label className=" hover:scale-102 shadow-md
            hover:shadow-[#191927] transition-all duration-300
            cursor-pointer text-[#191927] font-semibold bg-[#8e72ee]
            py-1.5 rounded-md p-5 ">
                <input type="file" onChange={handle_change} className="hidden" />
                <span className="text-left">{file ? `Selected File: ${file.name}` : `Select a File: `}</span>
            </label>
            {file && <img src={preview} alt="preview" className="w-50 h-50 object-cover rounded-md opacity-0 animate-fadeIn" />}

            <button className="cursor-pointer text-[#191927] bg-gradient-to-t from-[#00d7d2] to-[#8e72ee] 
            font-semibold px-6 py-2 rounded-md shadow-md
            transform transition-all duration-300 hover:scale-103 hover:shadow-[#191927]" onClick={handle_submit}>Convert to Chessboard</button>
            {fen &&
                <div className="shadow-lg">
                    <Load_chessboard key={fen} fen={fen} />
                </div>
            }
           
        </div>
    );
}
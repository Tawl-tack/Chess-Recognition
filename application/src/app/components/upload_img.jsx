"use client"

import { useState } from "react";
import Load_chessboard from "./load_chessboard";
import Image from "next/image";

export default function Upload_Image() {
    const [uploads, setUploads] = useState([]);
    const [chessboardSideBar, setChessBoardSideBar] = useState(false);


    const handle_change = (event) => {
        const files = Array.from(event.target.files);

        const new_items = files.map(file => {
            const id = crypto.randomUUID();

            return {
                id,
                file: file,
                preview: URL.createObjectURL(file),
                fen: ""
            };
        });

        setUploads(old_items => [...old_items, ...new_items]);

    }

    const handle_submit = async (id) => {
        const upload = uploads.find(u => u.id === id);
        if (!uploads.length) return;

        const formData = new FormData();
        formData.append("image", upload.file);

        const response = await fetch('/api/fastapi/convert', {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setUploads(prev => prev.map(item => (
            item.id === id
                ? { ...item, fen: data.fen }
                : item
        )
        ));

        setChessBoardSideBar(data.fen);

    }

    return (
        <div className="flex w-full h-screen justify-center">

            <div className={`transition-all duration-300 ease-in-out ${chessboardSideBar ? 'w-2/3' : 'w-full'} flex justify-center`}>
                <div className="flex flex-col items-center gap-5">

                    <h1 className="pb-1 text-4xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-t from-[#00d7d2] to-[#8e72ee] text-center mt-8">
                        Image to Chessboard Converter
                    </h1>

                    <h2 className="text-white">High precision in low time</h2>

                    <label className=" hover:scale-102 shadow-md
            hover:shadow-[#191927] transition-all duration-300
            cursor-pointer text-[#191927] font-semibold bg-[#8e72ee]
            py-1.5 rounded-md p-5 ">
                        <input type="file" onChange={handle_change} className="hidden" multiple />
                        <span className="text-left">Select a File:</span>
                    </label>

                    {/* {file && <img src={preview} alt="preview" className="w-50 h-50 object-cover rounded-md opacity-0 animate-fadeIn" />} */}

                    <div className="container-previews grid grid-cols-3 gap-4 justify-items-center">
                        {uploads.length > 0 &&
                            uploads.map((upload) => (
                                <div key={upload.id} className="flex flex-col items-center gap-2 w-60 h-60 bg-[#3c3c57] p-5 rounded-md
                        transform transition-all duration-300 hover:scale-103 hover:shadow-[#191927]
                        ">
                                    <img src={upload.preview} className="w-40 h-40 object-cover rounded-md opacity-0 animate-fadeIn" />
                                    <button className="w-40 h-8 px-2 py-1 cursor-pointer text-[#191927] bg-[#8e72ee] rounded-md shadow-md
                            transform transition-all duration-300 hover:scale-103 hover:shadow-[#191927]"
                                        onClick={() => handle_submit(upload.id)}> Convert</button>
                                </div>
                            ))
                        }

                        {
                            uploads.length > 0 &&

                            <div className="flex items-center justify-center h-60 w-60  rounded-md
               transform transition-all duration-300 hover:scale-103 hover:shadow-[#191927]
               bg-[#3c3c57]
               ">
                                <label className="hover:scale-120 transition-all duration-300 cursor-pointer">
                                    <input type="file" onChange={handle_change} className="hidden" multiple />
                                    {/* <span className="text-2xl font-bold font-sans bg-[#8e72ee] rounded-4xl px-4 py-2">+</span> */}
                                    <Image src={"/plus-hexagon.png"} width="60" height="60" alt="add-new-image" />
                                </label>
                            </div>

                        }
                    </div>

                </div>
            </div>

            <aside className={`mt-4 transform transition-transform duration-300 ease-in-out ${chessboardSideBar ? 'translate-x-0 w-1/3' : 'translate-x-full w-0'}`}>
                {
                    chessboardSideBar &&

                    <div keys={chessboardSideBar}>
                        <Load_chessboard key={chessboardSideBar} fen={chessboardSideBar} />
                    </div>

                }
            </aside>
        </div >
    );
}
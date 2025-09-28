"use server";

import { Puzzle } from "../database/models/tables";

export default async function showPuzzle() {
    const puzzles = await Puzzle.findAll();

    return (
        <div>
            <h1 className="pb-6 text-4xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-t from-[#00d7d2] to-[#8e72ee] text-center mt-8">
                List of Puzzles
            </h1>
            <div className="border-collapse border border-gray-800 rounded-lg overflow-hidden shadow-lg">
                <table className="w-full">
                    <thead className="bg-[#414156] border-b border-gray-800">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">Fen Inicial</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">Movimento Correto</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">Dificuldade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {puzzles.map(puzzle => (
                            <tr className="odd:bg-[#2B2B3F] even:bg-[#32324F]" key={puzzle.id}>
                                <td className="p-3 text-sm text-gray-200">{puzzle.fen_inicial}</td>
                                <td className="p-3 text-sm text-gray-200">{puzzle.movimento_correto}</td>
                                <td className="p-3 text-sm text-gray-200">{puzzle.dificuldade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
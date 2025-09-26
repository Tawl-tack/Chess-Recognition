"use server";

import { Puzzle } from "../database/models/tables";

export default async function showPuzzle () {
    const puzzles = await Puzzle.findAll();
    
    return (
        <div>
        <table border="1">
            <thead>
                <tr>
                    <th>fen_inicial</th>
                    <th>movimento_correto</th>
                    <th>dificuldade</th>
                </tr>
            </thead>
            <tbody>
                {puzzles.map(puzzle => (
                    <tr key={puzzle.id}>
                        <td >{puzzle.fen_inicial}</td>
                        <td>{puzzle.movimento_correto}</td>
                        <td>{puzzle.dificuldade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
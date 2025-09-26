import createPuzzle from "@/app/actions/puzzles";

export default async function FormUsuario() {
    return (
        <form action={createPuzzle}>
            <h2>Insert Puzzle</h2>
            <input name="fen_inicial" placeholder="fen_inicial" /> <br />
            <input name="movimento_correto" placeholder="movimento_correto" /> <br />
            <input name="dificuldade" placeholder="dificuldade" /> <br />
            <button type="submit">Sign Up Puzzle</button>
        </form>
    );
}
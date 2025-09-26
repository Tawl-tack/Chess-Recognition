import createPlano from "@/app/actions/planos";

export default async function FormPlano () {
    return (
        <form action={createPlano}>
            <h2>Insert Plano</h2>
            <input name="nome_plano" placeholder="nome_plano" /> <br />
            <input name="preco_plano" placeholder="preco_plano" /> <br />
            <input name="duracao_dias" placeholder="duracao_dias" /> <br />
            <input name="limite_conversoes" placeholder="limite_conversoes" /> <br />
            <button type="submit">Sign Up Plano</button>
        </form>
    );
}
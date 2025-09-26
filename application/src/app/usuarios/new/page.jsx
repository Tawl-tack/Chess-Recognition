import createUsuario from "@/app/actions/usuarios";

export default async function FormUsuario() {
    return (
        <form action={createUsuario}>
            <h2>Insert Usuario</h2>
            <input name="nome" placeholder="Name" /> <br />
            <input name="email" placeholder="Email" /> <br />
            <input type="password" name="senha" placeholder="Password" /> <br />
            <button type="submit">Sign Up Usuario</button>
        </form>
    );
}
import createAssinatura from "@/app/actions/assinaturas";

export default async function FormAssinatura() {
    return (
        <form action={createAssinatura}>
            <h2>Insert Assinatura</h2>
            <input name="data_inicio" placeholder="data_inicio" /> <br />
            <input name="data_fim" placeholder="data_fim" /> <br />
            <input name="status_assinatura" placeholder="status_assinatura" /> <br />
            <button type="submit">Sign Up Assinatura</button>
        </form>
    );
}
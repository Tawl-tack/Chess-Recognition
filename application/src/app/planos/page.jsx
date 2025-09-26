"use server";

import { Plano } from "../database/models/tables";

export default async function showPlanos() {
    const planos = await Plano.findAll();

    console.log(planos);

    return (
        <div>
            <h1>Lista de Planos</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome Do Plano</th>
                        <th>Preço do Plano</th>
                        <th>Duração do Plano</th>
                        <th>Limite de Conversões</th>
                        <th>Data de Criação</th>
                        <th>Data de Alteração</th>
                    </tr>
                </thead>
                <tbody>
                    {planos.map(plano => (
                        <tr key={plano.id}>
                            <td>{plano.nome_plano}</td>
                            <td>{plano.preco_plano}</td>
                            <td>{plano.duracao_dias}</td>
                            <td>{plano.limite_conversoes}</td>
                            <td>{plano.createdAt.toLocaleString("pt-BR")}</td>
                            <td>{plano.updatedAt.toLocaleString("pt-BR")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
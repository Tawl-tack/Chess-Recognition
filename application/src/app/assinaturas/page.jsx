"use server";

import { Assinatura } from "../database/models/tables";

export default async function showAssinaturas () {
    const assinaturas = await Assinatura.findAll();
    
    return (
        <div>
        <table border="1">
            <thead>
                <tr>
                    <th>data_inicio</th>
                    <th>data_fim</th>
                    <th>status_assinatura</th>
                </tr>
            </thead>
            <tbody>
                {assinaturas.map(assinatura => (
                    <tr key={assinatura.id}>
                        <td >{assinatura.data_inicio}</td>
                        <td>{assinatura.data_fim}</td>
                        <td>{assinatura.status_assinatura}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
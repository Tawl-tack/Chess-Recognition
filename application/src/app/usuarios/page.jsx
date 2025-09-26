"use server";

import { Usuario } from "../database/models/tables";

export default async function showUsuarios () {
    const usuarios = await Usuario.findAll();
    
    return (
        <div>
        <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(usuario => (
                    <tr key={usuario.id}>
                        <td >{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.senha}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}
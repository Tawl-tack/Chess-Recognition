"use server";

import { Usuario } from "../database/models/tables";

export default async function showUsuarios() {
    const usuarios = await Usuario.findAll();

    return (
        <div>
            <h1 className="pb-6 text-4xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-t from-[#00d7d2] to-[#8e72ee] text-center mt-8">
                List of Usuarios
            </h1>
            <div className="border-collapse border border-gray-800 rounded-lg overflow-hidden shadow-lg">
                <table className="w-full">
                    <thead className="bg-[#414156] border-b border-gray-800">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">ID</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">Email</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr className="odd:bg-[#2B2B3F] even:bg-[#32324F]" key={usuario.id}>
                                <td className="p-3 text-sm text-gray-200">{usuario.id}</td>
                                <td className="p-3 text-sm text-gray-200">{usuario.nome}</td>
                                <td className="p-3 text-sm text-gray-200">{usuario.email}</td>
                                <td className="p-3 text-sm text-gray-200">{usuario.senha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
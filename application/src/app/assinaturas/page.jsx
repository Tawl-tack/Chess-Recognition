"use server";

import { Assinatura } from "../database/models/tables";

export default async function showAssinaturas() {
    const assinaturas = await Assinatura.findAll();

    return (
        <div>
            <h1 className="pb-6 text-4xl font-bold bg-clip-text text-transparent 
               bg-gradient-to-t from-[#00d7d2] to-[#8e72ee] text-center mt-8">
                List of Assinaturas
            </h1>
            <div className="border-collapse border border-gray-800 rounded-lg overflow-hidden shadow-lg">
                <table className="w-full">
                    <thead className="bg-[#414156] border-b border-gray-800">
                        <tr>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">data_inicio</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">data_fim</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left text-gray-200">status_assinatura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assinaturas.map(assinatura => (
                            <tr className="odd:bg-[#2B2B3F] even:bg-[#32324F]" key={assinatura.id}>
                                <td className="p-3 text-sm text-gray-200">{assinatura.data_inicio}</td>
                                <td className="p-3 text-sm text-gray-200">{assinatura.data_fim}</td>
                                <td className="p-3 text-sm text-gray-200">{assinatura.status_assinatura}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
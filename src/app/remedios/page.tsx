"use client"

import { RemedioItemLista } from '@/app/view/remedy';
import { useEffect, useState } from 'react';
import useSWR from 'swr'

const SERVERSIDE_URL = "/api/remedios"

const fetcher = (
    url: string, options?: RequestInit
) => fetch(url, options).then((res) => res.json())

const fetcherNoData = (
    url: string, options?: RequestInit
) => fetch(url, options)

const Remedios = () => {
    const [remedios, setRemedios] = useState<RemedioItemLista[]>([])
    const { data, error } = useSWR(SERVERSIDE_URL, fetcher)

    useEffect(() => {
        if (data) setRemedios(data)
    }, [data])

    const deletarRemedio = async (id: number) => {
        await fetcherNoData(`${SERVERSIDE_URL}/${id}`, {
            method: 'DELETE'
        })
        window.location.reload();
        
    }

    if (error) return <div className='
    flex 
    p-6 
    justify-center 
    w-full'>Não foi possível se conectar a base de dados.</div>
    if (!data) return <div className='
        uppercase 
        flex 
        p-6 
        justify-center 
        w-full'>Carregando...</div>

    return (
        <div className="overflow-x-auto">
            <table className="
                w-full 
                divide-y 
                divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {remedios.length > 0 ? [...Object.keys(remedios[0]), "ações"]
                            .map((tituloColuna, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="
                                px-6 
                                py-3 
                                text-left 
                                text-xs 
                                font-medium 
                                text-gray-500 
                                uppercase 
                                tracking-wider">
                                {tituloColuna}
                            </th>
                        )) : ""}
                    </tr>
                </thead>

                {remedios.length > 0 ?
                    <tbody className="bg-white divide-y divide-gray-200">
                        {remedios.map((linha, index) => (
                            <tr key={index}>
                                {Object.values(linha).map((value, idx) => (
                                    <td key={idx} className="px-6 py-4 whitespace-nowrap">
                                        <div className="
                                            text-sm 
                                            text-gray-900 
                                            truncate" title={value}>
                                            {value}
                                        </div>
                                    </td>
                                ))}

                                <td className="
                                    px-6 
                                    py-4 
                                    whitespace-nowrap 
                                    text-left 
                                    text-sm 
                                    font-medium">
                                    <a href={`/remedios/${linha.id}`} className="
                                        text-indigo-600 
                                        hover:text-indigo-900">
                                        editar
                                    </a>

                                    <a href="#" onClick={() => deletarRemedio(linha.id)} className="
                                        ml-4 
                                        text-red-600 
                                        hover:text-red-900">
                                        deletar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    : <p className='px-6 py-4 ml-4'>Não há remédios cadastrados</p>
                }

            </table>
        </div>
    );
};


export default Remedios;
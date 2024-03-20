"use client"

import { RemedioAtualizacao } from "@/app/view/remedy"
import { useEffect, useState } from "react"

interface ValidadorRemedioAtualizacao {
    nome: {
        ativo: boolean,
        mensagem: string
    },
    via: {
        ativo: boolean,
        mensagem: string
    },
    laboratorio: {
        ativo: boolean,
        mensagem: string
    }
}

const NOME_EM_BRANCO_MSG = "O nome não pode estar em branco."
const NOME_LONGO_MSG = "O nome deve ter no máximo 20 caracteres."
const VIA_DESSELECIONADA_MSG = "A via deve ser selecionada!"
const LAB_DESSELECIONADO_MSG = "A laboratório deve ser selecionado!"

const vias: string[] = ["ORAL", "NASAL", "VENOSO", "INTRAMUSCULAR", "RETAL"]
const laboratorios: string[] = ["MEDLEY", "LABEXEMP"]

export default function AtualizarRemedio() {
    const [updateDTO, setUpdateDTO] = useState<RemedioAtualizacao>({
        id: 0,
        nome: "",
        via: "",
        laboratorio: ""
    })

    const [formularioPronto, setFormularioPronto] = useState<boolean>(false)

    const [validador, setValidador] = useState<ValidadorRemedioAtualizacao>({
        nome: {
            ativo: false,
            mensagem: ""
        },
        via: {
            ativo: false,
            mensagem: ""
        },
        laboratorio: {
            ativo: false,
            mensagem: ""
        }
    })

    const handleMudarNome = (nome: string) => {
        setUpdateDTO({...updateDTO, nome})
    }

    const handleMudarVia = (via: string) => {
        setUpdateDTO({...updateDTO, via})
    }

    const handleMudarLab = (laboratorio: string) => {
        setUpdateDTO({...updateDTO, laboratorio})
    }

    useEffect(() => checarCampos(), [updateDTO])
    
    useEffect(() => {
        setFormularioPronto(
            !Object
                .values(validador)
                .every(val => val.ativo === false)
        )
    }, [validador])

    function checarCampos() {

        const validadorChecado = {
            nome: {
                ativo: !updateDTO.nome || updateDTO.nome.length > 20,
                mensagem: !updateDTO.nome
                    ? NOME_EM_BRANCO_MSG
                    : updateDTO.nome.length > 20
                        ? NOME_LONGO_MSG
                        : ""
            },
            laboratorio: {
                ativo: !updateDTO.laboratorio,
                mensagem: !updateDTO.laboratorio
                    ? LAB_DESSELECIONADO_MSG
                    : ""
            },
            via: {
                ativo: !updateDTO.via,
                mensagem: !updateDTO.via
                    ? VIA_DESSELECIONADA_MSG
                    : ""
            }
        }

        setValidador(validadorChecado)
    }

    function save() {
        
    }

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="
                mt-8
                lg:mt-0
                text-xl
                uppercase
                titulobg
                font-black
                mb-4">
                Atualizar remedio
            </h2>

            <div className="w-96 lg:w-1/3 mb-4">
                <label className="
                block 
                mb-2 
                text-sm 
                font-medium 
                text-black">Nome</label>

                <input
                    autoComplete="off"
                    type="text"
                    name="remedio-name"
                    value={updateDTO.nome}
                    onChange={(e) => { handleMudarNome(e.target.value) }}
                    className="
                    bg-gray-50 border 
                    border-gray-500 
                    text-gray-900 
                    placeholder-gray-700 
                    text-sm 
                    rounded-lg
                    block 
                    w-full 
                    p-2.5"/>
                <p className={`
                    mt-2 
                    text-sm 
                    text-red-600
                    ${validador.nome.ativo ? '' : 'invisible'}`}>
                    <span className="font-medium">Atenção!</span> {validador.nome.mensagem}
                </p>
            </div>

            <div className="w-96 lg:w-1/3 mb-4">
                <label className="
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    text-black">Via</label>

                <select
                    name="remedio-via"
                    value={updateDTO.via}
                    onChange={(e) => { handleMudarVia(e.target.value) }}
                    className="
                        bg-gray-50 border 
                        border-gray-500 
                        text-gray-900 
                        placeholder-gray-700 
                        text-sm 
                        rounded-lg
                        block 
                        w-full 
                        p-2.5">
                    <option value="">Selecione...</option>
                    {vias.map((via) => (
                        <option key={via} value={via}>{via}</option>
                    ))}
                </select>

                <p className={`
                    mt-2 
                    text-sm 
                    text-red-600
                    ${validador.via.ativo ? '' : 'invisible'}`}>
                    <span className="font-medium">Atenção!</span> {validador.via.mensagem}
                </p>
            </div>

            <div className="w-96 lg:w-1/3 mb-4">
                <label className="
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    text-black">Laboratório</label>

                <select
                    name="remedio-laboratorio"
                    value={updateDTO.laboratorio}
                    onChange={(e) => { handleMudarLab(e.target.value) }}
                    className="
                        bg-gray-50 border 
                        border-gray-500 
                        text-gray-900 
                        placeholder-gray-700 
                        text-sm 
                        rounded-lg
                        block 
                        w-full 
                        p-2.5">
                    <option value="">Selecione...</option>
                    {laboratorios.map((lab) => (
                        <option key={lab} value={lab}>{lab}</option>
                    ))}
                </select>

                <p className={`
                    mt-2 
                    text-sm 
                    text-red-600
                    ${validador.laboratorio.ativo ? '' : 'invisible'}`}>
                    <span className="font-medium">Atenção!</span> {validador.laboratorio.mensagem}
                </p>
            </div>

            <button 
                disabled={formularioPronto}
                className={`
                    mb-8
                    flex text-xl  
                    px-6 py-2 
                    rounded-md
                    bg-gradient-to-b from-cyan-100 to-white 
                    text-slate-900
                    hover:bg-gradient-to-b hover:from-cyan-200 hover:to-white 
                    ${formularioPronto? `
                        disabled:bg-gradient-to-b 
                        disabled:from-gray-200 
                        disabled:to-white
                        disabled:text-red-900
                        disabled:cursor-not-allowed`: ``} 
                `} 
            onClick={save}>
                Enviar
            </button>
        </div>
    )
}
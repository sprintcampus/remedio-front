"use client"

import { RemedioCadastro } from "@/app/view/remedy"
import { useEffect, useState } from "react"

import styles from "./cadastrar.module.css";
import { useRouter } from "next/navigation";

interface ValidadorRemedio {
    nome: {
        ativo: boolean,
        mensagem: string
    },
    via: {
        ativo: boolean,
        mensagem: string
    },
    validade: {
        ativo: boolean,
        mensagem: string
    },
    laboratorio: {
        ativo: boolean,
        mensagem: string
    },
    lote: {
        ativo: boolean,
        mensagem: string
    }
}

const NOME_EM_BRANCO_MSG = "O nome não pode estar em branco."
const NOME_LONGO_MSG = "O nome deve ter no máximo 20 caracteres."
const VIA_DESSELECIONADA_MSG = "A via deve ser selecionada!"
const LOTE_EM_BRANCO_MSG = "O lote não pode estar em branco."
const VALIDADE_NO_PASSADO_MSG = "A data de validade deve ser no futuro."
const VALIDADE_DESSELECIONADA_MSG = "A validade deve ser selecionada!"
const LAB_DESSELECIONADO_MSG = "A laboratório deve ser selecionado!"

const fetcher = (
    url: string, options?: RequestInit
) => fetch(url, options).then((res) => res.json())

export default function CadastrarRemedio() {
    
    const dataAtual = new Date().toISOString().split('T')[0]
    const router = useRouter()

    const [createDTO, setCreateDTO] = useState<RemedioCadastro>({
        laboratorio: "",
        lote: "",
        nome: "",
        quantidade: 0,
        validade: "",
        via: ""
    })

    const [formularioPronto, setFormularioPronto] = useState<boolean>(false)

    const [validador, setValidador] = useState<ValidadorRemedio>({
        nome: {
            ativo: false,
            mensagem: ""
        },
        via: {
            ativo: false,
            mensagem: ""
        },
        validade: {
            ativo: false,
            mensagem: ""
        },
        laboratorio: {
            ativo: false,
            mensagem: ""
        },
        lote: {
            ativo: false,
            mensagem: ""
        }
    })

    useEffect(() => {
        checarCampos()
    }, [createDTO])

    useEffect(() => {
        console.log(formularioPronto)
        setFormularioPronto(
            !Object
                .values(validador)
                .every(val => val.ativo === false)
        )
    }, [validador])

    const vias: string[] = ["ORAL", "NASAL", "VENOSO", "INTRAMUSCULAR", "RETAL"]
    const laboratorios: string[] = ["MEDLEY", "LABEXEMP"]

    const handleChangeName = (name: string) => {
        setCreateDTO({
            ...createDTO,
            nome: name
        })
    }

    const handleChangeLote = (lote: string) => {
        setCreateDTO({
            ...createDTO,
            lote: lote
        })
    }

    const handleChangeValidade = (validade: string) => {
        setCreateDTO({
            ...createDTO,
            validade: validade
        })
    }

    const handleChangeQuantidade = (quantidade: number) => {
        if (quantidade < 0)
            return;
        setCreateDTO({
            ...createDTO,
            quantidade: quantidade
        })
    }

    const handleChangeVia = (via: string) => {
        if (!vias.includes(via))
            return;
        setCreateDTO({
            ...createDTO,
            via: via
        })
    }

    const handleChangeLaboratorio = (lab: string) => {
        if (!laboratorios.includes(lab))
            return;
        setCreateDTO({
            ...createDTO,
            laboratorio: lab
        })
    }

    function checarCampos() {
        const agora = new Date();
        const validade = new Date(createDTO.validade);

        const validadorChecado = {
            nome: {
                ativo: !createDTO.nome || createDTO.nome.length > 20,
                mensagem: !createDTO.nome
                    ? NOME_EM_BRANCO_MSG
                    : createDTO.nome.length > 20
                        ? NOME_LONGO_MSG
                        : ""
            },
            laboratorio: {
                ativo: !createDTO.laboratorio,
                mensagem: !createDTO.laboratorio
                    ? LAB_DESSELECIONADO_MSG
                    : ""
            },
            via: {
                ativo: !createDTO.via,
                mensagem: !createDTO.via
                    ? VIA_DESSELECIONADA_MSG
                    : ""
            },
            lote: {
                ativo: !createDTO.lote,
                mensagem: !createDTO.lote
                    ? LOTE_EM_BRANCO_MSG
                    : ""
            },
            validade: {
                ativo: !createDTO.validade || validade.getTime() <= agora.getTime(),
                mensagem: !createDTO.validade
                    ? VALIDADE_DESSELECIONADA_MSG
                    : validade.getTime() <= agora.getTime()
                        ? VALIDADE_NO_PASSADO_MSG
                        : ""
            }
        }

        setValidador(validadorChecado)
    }

    const save = async () => {
        await fetcher('/api/remedios', {
            method: "POST",
            body: JSON.stringify(createDTO)
        })
            .then(_ =>router.push("/remedios"))
            .catch(err => console.error('Erro ao cadastrar remédio:', err))
    };


    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="
                text-xl
                uppercase
                titulobg
                font-black
                mb-4">
                Cadastrar remedio
            </h2>

            <div className="w-96 mb-4">
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
                    value={createDTO.nome}
                    onChange={(e) => { handleChangeName(e.target.value) }}
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

            <div className="w-96 mb-4">
                <label className="
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    text-black">Via</label>

                <select
                    name="remedio-via"
                    value={createDTO.via}
                    onChange={(e) => { handleChangeVia(e.target.value) }}
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

            <div className="w-96 mb-4">
                <label className="
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    text-black">Laboratório</label>

                <select
                    name="remedio-laboratorio"
                    value={createDTO.laboratorio}
                    onChange={(e) => { handleChangeLaboratorio(e.target.value) }}
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


            <div className="w-96 mb-4">
                <label className="
                block 
                mb-2 
                text-sm 
                font-medium 
                text-black">Lote</label>

                <input
                    autoComplete="off"
                    type="text"
                    name="remedio-lote"
                    value={createDTO.lote}
                    onChange={(e) => { handleChangeLote(e.target.value) }}
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
                    ${validador.lote.ativo ? '' : 'invisible'}`}>
                    <span className="font-medium">Atenção!</span> {validador.lote.mensagem}
                </p>
            </div>

            <div className="w-96 mb-8">
                <label className="
                block 
                mb-2 
                text-sm 
                font-medium 
                text-black">Quantidade</label>

                <input
                    autoComplete="off"
                    type="number"
                    name="remedio-quantidade"
                    value={createDTO.quantidade}
                    onChange={(e) => { handleChangeQuantidade(parseInt(e.target.value)) }}
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
            </div>

            <div className="w-96 mb-4">
                <label htmlFor="validade"   
                    className="
                    block 
                    mb-2 
                    text-sm 
                    font-medium 
                    text-black">Validade</label>

                <input 
                    type="date"
                    id="validade"
                    name="validade"
                    min={dataAtual}
                    value = {createDTO.validade}
                    onChange={(e) => handleChangeValidade(e.target.value)}
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
                    ${validador.validade.ativo ? '' : 'invisible'}`}>
                    <span className="font-medium">Atenção!</span> {validador.validade.mensagem}
                </p>
            </div>

            <button 
                disabled={formularioPronto}
                className={`
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

            {/* <div className={`${styles.inputContainer} ${styles.nomeContainer}`}>
                <label htmlFor="remedio-name">Nome</label>
                <input
                    type="text"
                    name="remedio-name"
                    id=""
                    value={createDTO.nome}
                    onChange={(e) => { handleChangeName(e.target.value) }}
                />
            </div>

            <div className={`${styles.inputContainer} ${styles.viaContainer}`}>
                <label htmlFor="via">Via</label>
                <select name="via" id="" onChange={(e) => { handleChangeVia(e.target.value) }}>
                    <option value={""}>Selecione ...</option>
                    {
                        vias.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>

            <div className={`${styles.inputContainer} ${styles.labortorioContainer}`}>
                <label htmlFor="laboratorio">Laboratório</label>
                <select name="laboratorio" id="" onChange={(e) => { handleChangeLaboratorio(e.target.value) }}>
                    <option value={""}>Selecione ...</option>
                    {
                        laboratorios.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))
                    }
                </select>
            </div>

            <div className={`${styles.inputContainer} ${styles.loteContainer}`}>
                <label htmlFor="lote">Lote</label>
                <input
                    type="text"
                    name="lote"
                    value={createDTO.lote}
                    onChange={(e) => handleChangeLote(e.target.value)}
                />
            </div>

            <div className={`${styles.inputContainer} ${styles.quantidadeContainer}`}>
                <label htmlFor="quantidade">Quantidade</label>
                <input
                    type="number"
                    name="quantidade"
                    value={createDTO.quantidade}
                    onChange={(e) => handleChangeQuantidade(parseInt(e.target.value))}
                />
            </div>


            <div className={`${styles.inputContainer} ${styles.validadeContainer}`}>
                <label htmlFor="validade">Validade</label>
                <input
                    type="date"
                    name="validade"
                    value={createDTO.validade}
                    onChange={(e) => handleChangeValidade(e.target.value)}
                />
            </div> */}

            {/* <div className={`${styles.submitButton}`} onClick={save}>
                Enviar
            </div> */}

           

        </div>
    )
}
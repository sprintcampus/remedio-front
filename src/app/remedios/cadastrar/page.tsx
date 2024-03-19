"use client"

import { RemedioCadastro } from "@/app/view/remedy"
import { useState } from "react"

import styles from "./cadastrar.module.css";
import { POST } from "@/app/api/remedios/route";
import { useRouter } from "next/navigation";

const fetcher = (
    url: string, options?: RequestInit
) => fetch(url, options).then((res) => res.json())

export default function CadastrarRemedio() {

    const router = useRouter()

    const [createDTO, setCreateDTO] = useState<RemedioCadastro>({
        id: 0,
        laboratorio: "",
        lote: "",
        nome: "",
        quantidade: 0,
        validade: "",
        via: ""
    })

    const vias : string[] = ["ORAL", "NASAL", "VENOSO", "INTRAMUSCULAR", "RETAL"]
    const laboratorios : string[] = ["MEDLEY", "LABEXEMP"]

    const handleChangeName = (name : string) => {
        setCreateDTO({
            ...createDTO, 
            nome: name
        })
    }

    const handleChangeLote = (lote : string) => {
        setCreateDTO({
            ...createDTO, 
            lote: lote
        })
    }
    
    const handleChangeValidade = (validade : string) => {
        setCreateDTO({
            ...createDTO, 
            validade : validade
        })
    }

    const handleChangeQuantidade = (quantidade : number) => {
        if(quantidade < 0)
            return;
        setCreateDTO({
            ...createDTO, 
            quantidade : quantidade
        })
    }

    const handleChangeVia = (via : string) => {
        if(!vias.includes(via))
            return;
        setCreateDTO({
            ...createDTO,
            via: via
        })
    }

    const handleChangeLaboratorio = (lab : string) => {
        if(!laboratorios.includes(lab))
            return;
        setCreateDTO({
            ...createDTO,
            laboratorio: lab
        })
    }

    const save = async () => {
        
        await fetcher('/api/remedios', {
            method: "POST",
            body: JSON.stringify(createDTO)
        }).then(r => {
            if(parseInt(r.status, 10) === 201) {
                router.push("/remedios")
            } else {
                console.error('Erro ao cadastrar remédio:', r.status); 
            }
        })
    };


    return (
        <div className={styles.cadastrarRemedioContainer}>

            <h2>Cadastrar remedio</h2>

            <div className={`${styles.inputContainer} ${styles.nomeContainer}`}>
                <label htmlFor="remedio-name">Nome</label>
                <input 
                type="text" 
                name="remedio-name" 
                id=""
                value={createDTO.nome}
                onChange={(e) => {handleChangeName(e.target.value)}}
                />
            </div>

            <div className={`${styles.inputContainer} ${styles.viaContainer}`}>
                <label htmlFor="via">Via</label>
                <select name="via" id="" onChange={(e) => {handleChangeVia(e.target.value)}}>
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
                <select name="laboratorio" id="" onChange={(e) => {handleChangeLaboratorio(e.target.value)}}>
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
            </div>

            <div className={`${styles.submitButton}`} onClick={save}>
                Enviar
            </div>

        </div>
    )
}
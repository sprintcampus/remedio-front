interface RemedioBase {
    nome: string,
    via: string,
    laboratorio: string
}

export interface RemedioCadastro extends RemedioBase {
    id: number,
    lote: string,
    quantidade: number,
    validade: string,
}

export interface RemedioItemLista extends RemedioBase {
    id: number,
    lote: string,
    validade: string,
}

export interface RemedioAtualizacao extends RemedioBase {
    id: number,
}
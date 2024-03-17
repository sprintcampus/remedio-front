import { RemedioCadastro, RemedioItemLista } from "@/app/view/remedy";
import axios from "axios"
import { NextResponse } from "next/server";
import { detalhesApi } from "../_config";

export async function GET() {
    let remedios: RemedioItemLista[] = await axios
        .get(detalhesApi.baseUrl)
        .then(r => r['data'])

    return NextResponse.json(remedios)
}

export async function POST(createDTO : RemedioCadastro) {
    let remedio : RemedioCadastro = await axios
        .post(detalhesApi.baseUrl, createDTO)
        .then(r => r.data)

    return NextResponse.json(remedio)
}
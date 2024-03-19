import { RemedioCadastro, RemedioItemLista } from "@/app/view/remedy";
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { detalhesApi } from "../_config";

export async function GET() {
    let remedios: RemedioItemLista[] = await axios
        .get(detalhesApi.baseUrl)
        .then(r => r['data'])

    return NextResponse.json(remedios)
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const createDTO: RemedioCadastro = req.body

    let remedio : RemedioCadastro = await axios
        .post(detalhesApi.baseUrl, createDTO)
        .then(r => r.data)

    return res.status(201).json(remedio)
}
import { RemedioItemLista } from "@/app/view/remedy";
import axios from "axios"
import { NextResponse } from "next/server";
import { detalhesApi } from "../_config";

export async function GET() {
    let remedios: RemedioItemLista[] = await axios
        .get(detalhesApi.baseUrl)
        .then(r => r['data'])

    return NextResponse.json(remedios)
}
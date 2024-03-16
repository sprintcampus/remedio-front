import axios from "axios"
import { detalhesApi } from "../../_config"
import { NextApiResponse } from "next"

interface RemedioUrlInfo {
    params: {
        remedioId: string
    }
}

export async function DELETE(
    res: NextApiResponse, 
    { params }: RemedioUrlInfo
) {
    const id = params.remedioId
    
    await axios
        .delete(`${detalhesApi.baseUrl}/${id}`)

    return res.status(204).end()
}
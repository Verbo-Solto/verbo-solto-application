"use client"

import { Cabecalho } from "@/components/cabecalho"
import { LeitorObra } from "@/components/leitor-obra"
import { ComentariosObra } from "@/components/comentarios-obra"
import { ObrasRelacionadas } from "@/components/obras-relacionadas"
import { Rodape } from "@/components/rodape"
import { useEffect, useState } from "react"
import axios from "axios"
import { PageLayout } from "@/components/PageLayout"

interface PaginaObraProps {
  readonly params: {
    readonly id: string
  }
}

export default function PaginaObra({ params }: PaginaObraProps) {
  const [obra, setObra] = useState<any>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    setCarregando(true)
    setErro(null)
    axios
      .get(`http://localhost:8000/api/obras/${params.id}/`)
      .then((resp) => setObra(resp.data))
      .catch(() => setErro("Obra não encontrada."))
      .finally(() => setCarregando(false))
  }, [params.id])

  return (
    <PageLayout cabecalhoProps={{ onAuthClick: () => {} }} showFooter>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {carregando && <div className="text-center text-[#009c3b]">Carregando obra...</div>}
        {erro && <div className="text-center text-red-600">{erro}</div>}
        {obra && (
          <>
            <LeitorObra obraId={params.id} />
            <ComentariosObra obraId={params.id} />
            <ObrasRelacionadas obraId={params.id} />
          </>
        )}
      </div>
    </PageLayout>
  )
}
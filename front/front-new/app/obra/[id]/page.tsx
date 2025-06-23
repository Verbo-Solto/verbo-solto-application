"use client"

import { Cabecalho } from "@/components/cabecalho"
import { LeitorObra } from "@/components/leitor-obra"
import { ComentariosObra } from "@/components/comentarios-obra"
import { ObrasRelacionadas } from "@/components/obras-relacionadas"
import { Rodape } from "@/components/rodape"

interface PaginaObraProps {
  readonly params: {
    readonly id: string
  }
}

export default function PaginaObra({ params }: PaginaObraProps) {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} estaAutenticado={true} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeitorObra obraId={params.id} />
        <ComentariosObra obraId={params.id} />
        <ObrasRelacionadas obraId={params.id} />
      </div>

      <Rodape />
    </div>
  )
}

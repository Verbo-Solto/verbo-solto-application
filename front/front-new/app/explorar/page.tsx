"use client"

import { useState } from "react"
import { Cabecalho } from "@/components/cabecalho"
import { FiltrosExploracao } from "@/components/filtros-exploracao"
import { GradeObras } from "@/components/grade-obras"
import { Rodape } from "@/components/rodape"

export default function PaginaExplorar() {
  const [filtros, setFiltros] = useState({
    genero: "",
    cidade: "",
    tags: [],
    ordenarPor: "recente",
    busca: "",
  })

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} estaAutenticado={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#131313] mb-2">Explorar Obras</h1>
          <p className="text-[#6e6e6e]">Descubra histórias incríveis de escritores cearenses</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FiltrosExploracao filtros={filtros} onFiltrosChange={setFiltros} />
          </div>
          <div className="lg:col-span-3">
            <GradeObras filtros={filtros} />
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  )
}

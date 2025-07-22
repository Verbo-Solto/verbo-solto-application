"use client"

import { useState, useEffect } from "react"
import { Cabecalho } from "@/components/cabecalho"
import { FiltrosExploracao } from "@/components/filtros-exploracao"
import { GradeObras } from "@/components/grade-obras"
import { Rodape } from "@/components/rodape"
import { PageLayout } from "@/components/PageLayout"

interface Obra {
  id: number;
  titulo: string;
  capa: string;
  autor: {
    username: string;
  };
  genero: string;
  cidade: string;
  tags: any[];
  resumo: string;
  curtidas: number;
  comentarios: number;
  visualizacoes: number;
  dataPublicacao: string;
  tempoLeitura: string;
}

export default function PaginaExplorar() {
  const [filtros, setFiltros] = useState({
    genero: "",
    cidade: "",
    tags: [] as string[],
    ordenarPor: "-publicada_em",
    busca: "",
  })
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchObras = async () => {
      setLoading(true)
      const params = new URLSearchParams()
      if (filtros.genero) params.append('genero', filtros.genero)
      if (filtros.cidade) params.append('autor__cidade', filtros.cidade)
      if (filtros.busca) params.append('search', filtros.busca)
      if (filtros.ordenarPor) params.append('ordering', filtros.ordenarPor)
      filtros.tags.forEach(tag => params.append('tags__nome__in', tag))

      try {
        // Lembre-se de ajustar a URL da API conforme necessário
        const response = await fetch(`http://127.0.0.1:8000/api/explorar/?${params.toString()}`)
        const data = await response.json()
        setObras(data.results || data) // Ajuste conforme a estrutura da sua API (com ou sem paginação)
      } catch (error) {
        console.error("Erro ao buscar obras:", error)
        // Tratar o erro adequadamente
      } finally {
        setLoading(false)
      }
    }

    fetchObras()
  }, [filtros])

  return (
    <PageLayout cabecalhoProps={{ onAuthClick: () => {} }} showFooter>
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
            {loading ? (
              <p>Carregando obras...</p>
            ) : (
              <GradeObras obras={obras} />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

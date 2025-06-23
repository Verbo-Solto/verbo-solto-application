"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, BookOpen, User, MapPin, Calendar, Eye } from "lucide-react"
import Link from "next/link"

interface GradeObrasProps {
  filtros: {
    genero: string
    cidade: string
    tags: string[]
    ordenarPor: string
    busca: string
  }
}

interface Obra {
  id: string
  titulo: string
  autor: string
  genero: string
  cidade: string
  tags: string[]
  resumo: string
  curtidas: number
  comentarios: number
  visualizacoes: number
  dataPublicacao: string
  tempoLeitura: string
  capa?: string
}

export function GradeObras({ filtros }: GradeObrasProps) {
  const [obras, setObras] = useState<Obra[]>([])
  const [carregando, setCarregando] = useState(true)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const obrasPorPagina = 12

  // Dados simulados
  const obrasSimuladas: Obra[] = [
    {
      id: "1",
      titulo: "Sertão de Memórias",
      autor: "Maria Silva",
      genero: "Romance",
      cidade: "Fortaleza",
      tags: ["ceará", "sertão", "família"],
      resumo:
        "Uma história emocionante sobre as tradições do sertão cearense e os laços familiares que resistem ao tempo.",
      curtidas: 245,
      comentarios: 32,
      visualizacoes: 1250,
      dataPublicacao: "2024-01-15",
      tempoLeitura: "25 min",
    },
    {
      id: "2",
      titulo: "Ondas do Mucuripe",
      autor: "João Santos",
      genero: "Poesia",
      cidade: "Fortaleza",
      tags: ["praia", "amor", "poesia"],
      resumo:
        "Coletânea de poemas inspirados na beleza das praias de Fortaleza e nas histórias de amor que nascem à beira-mar.",
      curtidas: 189,
      comentarios: 28,
      visualizacoes: 890,
      dataPublicacao: "2024-01-10",
      tempoLeitura: "15 min",
    },
    {
      id: "3",
      titulo: "O Último Vaqueiro",
      autor: "Pedro Oliveira",
      genero: "Drama",
      cidade: "Juazeiro do Norte",
      tags: ["sertão", "tradição", "superação"],
      resumo: "A saga de um vaqueiro que luta para preservar as tradições do sertão em um mundo em constante mudança.",
      curtidas: 312,
      comentarios: 45,
      visualizacoes: 1680,
      dataPublicacao: "2024-01-08",
      tempoLeitura: "35 min",
    },
    {
      id: "4",
      titulo: "Fortaleza dos Sonhos",
      autor: "Ana Costa",
      genero: "Ficção",
      cidade: "Fortaleza",
      tags: ["cidade", "juventude", "esperança"],
      resumo:
        "Jovens em busca de seus sonhos na capital cearense, enfrentando desafios e descobrindo o verdadeiro significado da amizade.",
      curtidas: 156,
      comentarios: 19,
      visualizacoes: 720,
      dataPublicacao: "2024-01-05",
      tempoLeitura: "28 min",
    },
    {
      id: "5",
      titulo: "Cordel da Vida",
      autor: "Antônio Lima",
      genero: "Poesia",
      cidade: "Crato",
      tags: ["cordel", "cultura", "nordeste"],
      resumo: "Versos que contam a vida do povo nordestino através da tradicional literatura de cordel.",
      curtidas: 203,
      comentarios: 36,
      visualizacoes: 950,
      dataPublicacao: "2024-01-03",
      tempoLeitura: "20 min",
    },
    {
      id: "6",
      titulo: "Segredos de Jericoacoara",
      autor: "Carla Mendes",
      genero: "Suspense",
      cidade: "Jijoca de Jericoacoara",
      tags: ["mistério", "praia", "aventura"],
      resumo: "Um mistério envolvente nas dunas de Jericoacoara, onde segredos antigos vêm à tona.",
      curtidas: 278,
      comentarios: 41,
      visualizacoes: 1340,
      dataPublicacao: "2024-01-01",
      tempoLeitura: "42 min",
    },
  ]

  useEffect(() => {
    // Simular carregamento
    setCarregando(true)
    setTimeout(() => {
      let obrasFiltradas = [...obrasSimuladas]

      // Aplicar filtros
      if (filtros.busca) {
        obrasFiltradas = obrasFiltradas.filter(
          (obra) =>
            obra.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
            obra.autor.toLowerCase().includes(filtros.busca.toLowerCase()) ||
            obra.tags.some((tag) => tag.toLowerCase().includes(filtros.busca.toLowerCase())),
        )
      }

      if (filtros.genero) {
        obrasFiltradas = obrasFiltradas.filter((obra) => obra.genero === filtros.genero)
      }

      if (filtros.cidade) {
        obrasFiltradas = obrasFiltradas.filter((obra) => obra.cidade === filtros.cidade)
      }

      if (filtros.tags.length > 0) {
        obrasFiltradas = obrasFiltradas.filter((obra) => filtros.tags.some((tag) => obra.tags.includes(tag)))
      }

      // Aplicar ordenação
      switch (filtros.ordenarPor) {
        case "popular":
          obrasFiltradas.sort((a, b) => b.visualizacoes - a.visualizacoes)
          break
        case "curtidas":
          obrasFiltradas.sort((a, b) => b.curtidas - a.curtidas)
          break
        case "comentarios":
          obrasFiltradas.sort((a, b) => b.comentarios - a.comentarios)
          break
        case "alfabetico":
          obrasFiltradas.sort((a, b) => a.titulo.localeCompare(b.titulo))
          break
        default: // recente
          obrasFiltradas.sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime())
      }

      setObras(obrasFiltradas)
      setCarregando(false)
      setPaginaAtual(1)
    }, 500)
  }, [filtros])

  const obrasExibidas = obras.slice((paginaAtual - 1) * obrasPorPagina, paginaAtual * obrasPorPagina)

  const totalPaginas = Math.ceil(obras.length / obrasPorPagina)

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (carregando) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#e5e5e5] rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com resultados */}
      <div className="flex justify-between items-center">
        <p className="text-[#6e6e6e]">
          {obras.length === 0
            ? "Nenhuma obra encontrada"
            : obras.length === 1
              ? "1 obra encontrada"
              : `${obras.length} obras encontradas`}
        </p>
        {obras.length > 0 && (
          <p className="text-sm text-[#6e6e6e]">
            Página {paginaAtual} de {totalPaginas}
          </p>
        )}
      </div>

      {/* Grid de obras */}
      {obras.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-[#e5e5e5] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#131313] mb-2">Nenhuma obra encontrada</h3>
          <p className="text-[#6e6e6e] mb-4">Tente ajustar os filtros ou buscar por outros termos.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {obrasExibidas.map((obra) => (
            <div
              key={obra.id}
              className="bg-white border border-[#e5e5e5] rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                {/* Título e autor */}
                <div>
                  <h3 className="font-semibold text-[#131313] text-lg mb-1 line-clamp-2">{obra.titulo}</h3>
                  <div className="flex items-center gap-1 text-sm text-[#6e6e6e]">
                    <User className="w-4 h-4" />
                    <span>{obra.autor}</span>
                  </div>
                </div>

                {/* Resumo */}
                <p className="text-sm text-[#6e6e6e] line-clamp-3">{obra.resumo}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">
                    {obra.genero}
                  </Badge>
                  {obra.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {obra.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{obra.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Metadados */}
                <div className="flex items-center gap-4 text-xs text-[#6e6e6e]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{obra.cidade}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatarData(obra.dataPublicacao)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{obra.tempoLeitura}</span>
                  </div>
                </div>

                {/* Estatísticas e ação */}
                <div className="flex justify-between items-center pt-2 border-t border-[#f5f5f5]">
                  <div className="flex gap-4 text-sm text-[#6e6e6e]">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{obra.curtidas}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{obra.comentarios}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{obra.visualizacoes}</span>
                    </div>
                  </div>
                  <Link href={`/obra/${obra.id}`}>
                    <Button size="sm" className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white">
                      Ler
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPaginaAtual(Math.max(1, paginaAtual - 1))}
            disabled={paginaAtual === 1}
            className="border-[#e5e5e5]"
          >
            Anterior
          </Button>

          {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
            const pagina = i + 1
            return (
              <Button
                key={pagina}
                variant={paginaAtual === pagina ? "default" : "outline"}
                onClick={() => setPaginaAtual(pagina)}
                className={paginaAtual === pagina ? "bg-[#ff6b35] hover:bg-[#e55a2b] text-white" : "border-[#e5e5e5]"}
              >
                {pagina}
              </Button>
            )
          })}

          <Button
            variant="outline"
            onClick={() => setPaginaAtual(Math.min(totalPaginas, paginaAtual + 1))}
            disabled={paginaAtual === totalPaginas}
            className="border-[#e5e5e5]"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}

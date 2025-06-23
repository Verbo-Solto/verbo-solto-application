"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"
import Link from "next/link"

export function InterfaceMinhasObras() {
  const [abaAtiva, setAbaAtiva] = useState("publicadas")

  const estatisticas = {
    totalObras: 8,
    totalVisualizacoes: 15420,
    totalCurtidas: 892,
    totalComentarios: 234,
    seguidores: 156,
    avaliacaoMedia: 4.6,
  }

  const obrasPublicadas = [
    {
      id: 1,
      titulo: "Sertão Digital",
      status: "publicada",
      genero: "Ficção Científica",
      publicadaEm: "2024-01-15",
      visualizacoes: 1250,
      curtidas: 89,
      comentarios: 23,
      avaliacao: 4.8,
      tags: ["Tecnologia", "Nordeste", "Futuro"],
    },
    {
      id: 3,
      titulo: "O Último Vaqueiro",
      status: "publicada",
      genero: "Aventura",
      publicadaEm: "2024-01-10",
      visualizacoes: 890,
      curtidas: 67,
      comentarios: 15,
      avaliacao: 4.5,
      tags: ["Tradição", "Sertão"],
    },
    {
      id: 4,
      titulo: "Contos da Madrugada",
      status: "publicada",
      genero: "Crônica",
      publicadaEm: "2024-01-05",
      visualizacoes: 654,
      curtidas: 43,
      comentarios: 12,
      avaliacao: 4.3,
      tags: ["Urbano", "Reflexão"],
    },
  ]

  const rascunhos = [
    {
      id: 2,
      titulo: "Memórias Perdidas",
      status: "rascunho",
      genero: "Drama",
      ultimaEdicao: "2024-01-20",
      contadorPalavras: 2340,
      progresso: 45,
      tags: ["Família", "Memória"],
    },
    {
      id: 5,
      titulo: "Noites de Forró",
      status: "rascunho",
      genero: "Romance",
      ultimaEdicao: "2024-01-18",
      contadorPalavras: 1890,
      progresso: 30,
      tags: ["Música", "Amor"],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#131313] mb-2">Minhas Obras</h1>
            <p className="text-[#6e6e6e]">Gerencie suas publicações e rascunhos</p>
          </div>
          <Link href="/escrever">
            <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Obra
            </Button>
          </Link>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalObras}</div>
            <div className="text-sm text-[#6e6e6e]">Obras</div>
          </Card>
          <Card className="p-4 text-center">
            <Eye className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalVisualizacoes.toLocaleString()}</div>
            <div className="text-sm text-[#6e6e6e]">Visualizações</div>
          </Card>
          <Card className="p-4 text-center">
            <Heart className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalCurtidas}</div>
            <div className="text-sm text-[#6e6e6e]">Curtidas</div>
          </Card>
          <Card className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalComentarios}</div>
            <div className="text-sm text-[#6e6e6e]">Comentários</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{estatisticas.seguidores}</div>
            <div className="text-sm text-[#6e6e6e]">Seguidores</div>
          </Card>
          <Card className="p-4 text-center">
            <Star className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{estatisticas.avaliacaoMedia}</div>
            <div className="text-sm text-[#6e6e6e]">Avaliação</div>
          </Card>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
        <Button
          variant={abaAtiva === "publicadas" ? "default" : "ghost"}
          onClick={() => setAbaAtiva("publicadas")}
          className={abaAtiva === "publicadas" ? "bg-white shadow-sm" : ""}
        >
          Publicadas ({obrasPublicadas.length})
        </Button>
        <Button
          variant={abaAtiva === "rascunhos" ? "default" : "ghost"}
          onClick={() => setAbaAtiva("rascunhos")}
          className={abaAtiva === "rascunhos" ? "bg-white shadow-sm" : ""}
        >
          Rascunhos ({rascunhos.length})
        </Button>
        <Button
          variant={abaAtiva === "estatisticas" ? "default" : "ghost"}
          onClick={() => setAbaAtiva("estatisticas")}
          className={abaAtiva === "estatisticas" ? "bg-white shadow-sm" : ""}
        >
          Estatísticas
        </Button>
      </div>

      {/* Conteúdo baseado na aba ativa */}
      {abaAtiva === "publicadas" && (
        <div className="grid gap-6">
          {obrasPublicadas.map((obra) => (
            <Card key={obra.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-[#131313]">{obra.titulo}</h4>
                    <Badge className="bg-[#009c3b]">Publicada</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#6e6e6e] mb-3">
                    <span>{obra.genero}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(obra.publicadaEm).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {obra.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-[#6e6e6e]">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {obra.visualizacoes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {obra.curtidas}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {obra.comentarios}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {obra.avaliacao}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/obra/${obra.id}`}>
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/escrever?editar=${obra.id}`}>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Mais opções">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {abaAtiva === "rascunhos" && (
        <div className="grid gap-6">
          {rascunhos.map((obra) => (
            <Card key={obra.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-[#131313]">{obra.titulo}</h4>
                    <Badge variant="secondary">Rascunho</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#6e6e6e] mb-3">
                    <span>{obra.genero}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Editado em {new Date(obra.ultimaEdicao).toLocaleDateString("pt-BR")}
                    </div>
                    <span>•</span>
                    <span>{obra.contadorPalavras} palavras</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {obra.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso estimado</span>
                      <span>{obra.progresso}%</span>
                    </div>
                    <Progress value={obra.progresso} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/escrever?rascunho=${obra.id}`}>
                    <Button
                      variant="outline"
                      className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Continuar Escrevendo
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {abaAtiva === "estatisticas" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#009c3b]" />
              Crescimento de Visualizações
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Este mês</span>
                  <span>+2.3k visualizações</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mês anterior</span>
                  <span>+1.8k visualizações</span>
                </div>
                <Progress value={65} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Obras Mais Populares</h3>
            <div className="space-y-3">
              {obrasPublicadas
                .sort((a, b) => b.visualizacoes - a.visualizacoes)
                .map((obra) => (
                  <div key={obra.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{obra.titulo}</span>
                    <span className="text-sm text-[#6e6e6e]">{obra.visualizacoes} visualizações</span>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Engajamento por Gênero</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ficção Científica</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="w-20" />
                  <span className="text-sm text-[#6e6e6e]">90%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Aventura</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-20" />
                  <span className="text-sm text-[#6e6e6e]">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Crônica</span>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="w-20" />
                  <span className="text-sm text-[#6e6e6e]">60%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Metas de Escrita</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Obras publicadas este ano</span>
                  <span>3 / 5</span>
                </div>
                <Progress value={60} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Palavras escritas este mês</span>
                  <span>8.2k / 10k</span>
                </div>
                <Progress value={82} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

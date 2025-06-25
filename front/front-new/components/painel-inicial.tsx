"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Star, Eye, Heart, Plus, Clock, Award, Target } from "lucide-react"
import Link from "next/link"

export function PainelInicial() {
  const estatisticasUsuario = {
    obrasPublicadas: 3,
    obrasLidas: 24,
    seguidores: 156,
    seguindo: 89,
    curtidas: 892,
    avaliacaoMedia: 4.6,
  }

  const atividadeRecente = [
    { tipo: "publicou", titulo: "Sertão Digital", data: "2 dias atrás" },
    { tipo: "terminou", titulo: "A Rendeira de Aquiraz", data: "1 semana atrás" },
    { tipo: "curtiu", titulo: "Memórias do Açude", data: "2 semanas atrás" },
    { tipo: "seguiu", usuario: "Maria Santos", data: "3 semanas atrás" },
  ]

  const obrasDestaque = [
    {
      id: 1,
      titulo: "Sertão Digital",
      autor: "Maria Santos",
      genero: "Ficção Científica",
      visualizacoes: 1250,
      curtidas: 89,
      avaliacao: 4.8,
      capa: "bg-gradient-to-br from-blue-500 to-teal-500",
    },
    {
      id: 2,
      titulo: "A Rendeira de Aquiraz",
      autor: "Ana Costa",
      genero: "Romance",
      visualizacoes: 890,
      curtidas: 67,
      avaliacao: 4.5,
      capa: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      id: 3,
      titulo: "Memórias do Açude",
      autor: "João Oliveira",
      genero: "Drama",
      visualizacoes: 654,
      curtidas: 43,
      avaliacao: 4.3,
      capa: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
  ]

  const metasEscrita = {
    obrasMes: { atual: 1, meta: 2 },
    palavrasSemana: { atual: 3200, meta: 5000 },
    leiturasMes: { atual: 8, meta: 10 },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho de Boas-vindas */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Bem-vindo de volta, João! 👋</h1>
        <p className="text-[#6e6e6e]">
          Continue sua jornada literária. Você tem 2 obras em progresso e 3 novas notificações.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticasUsuario.obrasPublicadas}</div>
              <div className="text-sm text-[#6e6e6e]">Obras Publicadas</div>
            </Card>
            <Card className="p-4 text-center">
              <Eye className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticasUsuario.obrasLidas}</div>
              <div className="text-sm text-[#6e6e6e]">Obras Lidas</div>
            </Card>
            <Card className="p-4 text-center">
              <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticasUsuario.seguidores}</div>
              <div className="text-sm text-[#6e6e6e]">Seguidores</div>
            </Card>
          </div>

          {/* Ações Rápidas */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#131313] mb-4">Ações Rápidas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/escrever">
                <Button className="w-full h-20 bg-[#009c3b] hover:bg-[#009c3b]/90 flex-col gap-2">
                  <Plus className="w-6 h-6" />
                  <span>Nova Obra</span>
                </Button>
              </Link>
              <Link href="/explorar">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col gap-2 border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
                >
                  <BookOpen className="w-6 h-6" />
                  <span>Explorar Obras</span>
                </Button>
              </Link>
              <Link href="/minhas-obras">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <Eye className="w-6 h-6" />
                  <span>Minhas Obras</span>
                </Button>
              </Link>
              <Link href="/biblioteca">
                <Button variant="outline" className="w-full h-20 flex-col gap-2">
                  <Heart className="w-6 h-6" />
                  <span>Biblioteca</span>
                </Button>
              </Link>
            </div>
          </Card>

          {/* Obras em Destaque */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#131313]">Obras em Destaque</h3>
              <Link href="/explorar">
                <Button variant="ghost" className="text-[#009c3b] hover:text-[#009c3b]/80">
                  Ver todas
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {obrasDestaque.map((obra) => (
                <Card key={obra.id} className="overflow-hidden">
                  <div className={`w-full h-32 ${obra.capa} flex items-center justify-center`}>
                    <BookOpen className="w-12 h-12 text-white/80" />
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">
                      {obra.genero}
                    </Badge>
                    <h4 className="font-semibold text-[#131313] mb-1">{obra.titulo}</h4>
                    <p className="text-sm text-[#6e6e6e] mb-3">por {obra.autor}</p>
                    <div className="flex items-center justify-between text-xs text-[#6e6e6e]">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {obra.visualizacoes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {obra.curtidas}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {obra.avaliacao}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Barra Lateral */}
        <div className="space-y-6">
          {/* Metas de Escrita */}
          <Card className="p-6">
            <h4 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#009c3b]" />
              Metas de Escrita
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Obras este mês</span>
                  <span>
                    {metasEscrita.obrasMes.atual} / {metasEscrita.obrasMes.meta}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#009c3b] h-2 rounded-full"
                    style={{ width: `${(metasEscrita.obrasMes.atual / metasEscrita.obrasMes.meta) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Palavras esta semana</span>
                  <span>
                    {metasEscrita.palavrasSemana.atual} / {metasEscrita.palavrasSemana.meta}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#009c3b] h-2 rounded-full"
                    style={{
                      width: `${(metasEscrita.palavrasSemana.atual / metasEscrita.palavrasSemana.meta) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Leituras este mês</span>
                  <span>
                    {metasEscrita.leiturasMes.atual} / {metasEscrita.leiturasMes.meta}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#009c3b] h-2 rounded-full"
                    style={{ width: `${(metasEscrita.leiturasMes.atual / metasEscrita.leiturasMes.meta) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Atividade Recente */}
          <Card className="p-6">
            <h4 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#009c3b]" />
              Atividade Recente
            </h4>
            <div className="space-y-3">
              {atividadeRecente.map((atividade, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#009c3b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {atividade.tipo === "publicou" && <BookOpen className="w-4 h-4 text-[#009c3b]" />}
                    {atividade.tipo === "terminou" && <BookOpen className="w-4 h-4 text-[#009c3b]" />}
                    {atividade.tipo === "curtiu" && <Heart className="w-4 h-4 text-[#009c3b]" />}
                    {atividade.tipo === "seguiu" && <Users className="w-4 h-4 text-[#009c3b]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#131313]">
                      {atividade.tipo === "publicou" && `Publicou "${atividade.titulo}"`}
                      {atividade.tipo === "terminou" && `Terminou de ler "${atividade.titulo}"`}
                      {atividade.tipo === "curtiu" && `Curtiu "${atividade.titulo}"`}
                      {atividade.tipo === "seguiu" && `Começou a seguir ${atividade.usuario}`}
                    </p>
                    <p className="text-xs text-[#6e6e6e]">{atividade.data}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Conquistas */}
          <Card className="p-6">
            <h4 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#009c3b]" />
              Conquistas Recentes
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-[#009c3b]/5 rounded-lg">
                <div className="w-10 h-10 bg-[#009c3b] rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#131313] text-sm">Primeira Obra</p>
                  <p className="text-xs text-[#6e6e6e]">Publicou sua primeira obra</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#009c3b]/5 rounded-lg">
                <div className="w-10 h-10 bg-[#009c3b] rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#131313] text-sm">Leitor Ativo</p>
                  <p className="text-xs text-[#6e6e6e]">Leu 20 obras este mês</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

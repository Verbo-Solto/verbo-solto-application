"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Star, TrendingUp, Eye, Heart, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Obra {
  id: number;
  titulo: string;
  capa?: string;
  descricao: string;
  genero: string;
  visualizacoes: number;
  curtidas: number;
  tempoLeitura: string;
  autor: {
    username: string;
  };
}

export function DashboardInicial() {
  const [obrasDestaque, setObrasDestaque] = useState<Obra[]>([])
  const [obrasRecentes, setObrasRecentes] = useState<Obra[]>([])
  const [valoresEstatisticas, setValoresEstatisticas] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/explorar/?ordering=-destaque")
        const data = await response.json()
        setObrasDestaque(data.results || data)

        const responseRecentes = await fetch("http://127.0.0.1:8000/api/explorar/?ordering=-publicada_em")
        const dataRecentes = await responseRecentes.json()
        setObrasRecentes(dataRecentes.results || dataRecentes)
      } catch (error) {
        console.error("Erro ao buscar obras:", error)
      }
    }

    const fetchEstatisticas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/obras/estatisticas-gerais/")
        const data = await res.json()
        setValoresEstatisticas(data)
      } catch (err) {
        console.error("Erro ao buscar estatísticas gerais:", err)
      }
    }

    fetchObras()
    fetchEstatisticas()
  }, [])

  const estatisticas = [
    {
      icone: BookOpen,
      chave: "obras_publicadas",
      rotulo: "Obras Publicadas",
      cor: "text-blue-600",
      corFundo: "bg-blue-50",
      corBorda: "border-blue-200",
    },
    {
      icone: Users,
      chave: "escritores_ativos",
      rotulo: "Escritores Ativos",
      cor: "text-green-600",
      corFundo: "bg-green-50",
      corBorda: "border-green-200",
    },
    {
      icone: Star,
      chave: "avaliacoes",
      rotulo: "Avaliações",
      cor: "text-yellow-600",
      corFundo: "bg-yellow-50",
      corBorda: "border-yellow-200",
    },
    {
      icone: TrendingUp,
      chave: "leituras",
      rotulo: "Leituras",
      cor: "text-purple-600",
      corFundo: "bg-purple-50",
      corBorda: "border-purple-200",
    },
  ]

  const renderCardObra = (obra: Obra) => (
    <Card
      key={obra.id}
      className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className={`h-48 bg-gradient-to-br from-gray-300 to-gray-500 relative flex items-center justify-center`}>
        <BookOpen className="w-16 h-16 text-white/80" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {obra.genero}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#009c3b] transition-colors">
          {obra.titulo}
        </h3>
        <p className="text-sm text-gray-600 mb-2">por {obra.autor.username}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{obra.descricao}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{obra.visualizacoes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{obra.curtidas}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{obra.tempoLeitura}</span>
            </div>
          </div>
        </div>
        <Link href={`/obra/${obra.id}`}>
          <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Leia agora</Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <main className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-8 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Bem-vindo de volta! 👋</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Continue sua jornada literária e descubra novas histórias cearenses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {estatisticas.map((stat, index) => (
              <Card
                key={index}
                className={`border-2 ${stat.corBorda} hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        {valoresEstatisticas[stat.chave] ?? "--"}
                      </p>
                      <p className="text-sm text-gray-600">{stat.rotulo}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.corFundo} flex items-center justify-center`}>
                      <stat.icone className={`w-6 h-6 ${stat.cor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Destaques da Semana</h2>
            <Link href="/explorar">
              <Button variant="outline" className="group">
                Ver todos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {obrasDestaque.map(renderCardObra)}
          </div>
        </section>

        <section className="pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Publicações Recentes</h2>
            <Link href="/explorar">
              <Button variant="outline" className="group">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {obrasRecentes.map(renderCardObra)}
          </div>
        </section>
      </div>
    </main>
  )
}
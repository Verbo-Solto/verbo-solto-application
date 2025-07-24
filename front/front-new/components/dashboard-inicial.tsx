"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Star, TrendingUp, Eye, Heart, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
  const [obras, setObras] = useState<Obra[]>([])
  const [valoresEstatisticas, setValoresEstatisticas] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [obrasRes, estatisticasRes] = await Promise.all([
          fetch(`${API_BASE_URL}/explorar/?ordering=-publicada_em`),
          fetch(`${API_BASE_URL}/obras/estatisticas-gerais/`),
        ])
        if (!obrasRes.ok || !estatisticasRes.ok) {
          throw new Error("Falha ao buscar os dados da plataforma. Verifique a consola do servidor ou tente novamente mais tarde.")
        }
        const obrasData = await obrasRes.json()
        const estatisticasData = await estatisticasRes.json()
        setObras(obrasData.results || obrasData)
        setValoresEstatisticas(estatisticasData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-red-600 bg-red-50 p-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Oops! Algo correu mal.</h2>
          <p className="max-w-md">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700">
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>)}
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>)}
        </div>
      </div>
    )
  }

  const estatisticas = [
    { icone: BookOpen, chave: "total_obras", rotulo: "Obras Publicadas", cor: "text-blue-600", corFundo: "bg-blue-50", corBorda: "border-blue-200" },
    { icone: Users, chave: "escritores_ativos", rotulo: "Escritores Ativos", cor: "text-green-600", corFundo: "bg-green-50", corBorda: "border-green-200" },
    { icone: Star, chave: "avaliacoes", rotulo: "Avaliações", cor: "text-yellow-600", corFundo: "bg-yellow-50", corBorda: "border-yellow-200" },
    { icone: TrendingUp, chave: "leituras", rotulo: "Leituras", cor: "text-purple-600", corFundo: "bg-purple-50", corBorda: "border-purple-200" },
  ]

  const renderCardObra = (obra: Obra) => (
    <Card key={obra.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="h-48 relative bg-gray-200">
        {obra.capa ? (
          <img src={obra.capa.startsWith("data:image") || obra.capa.length > 100 ? `data:image/png;base64,${obra.capa}` : obra.capa} alt={`Capa da obra ${obra.titulo}`} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500">
            <BookOpen className="w-16 h-16 text-white/80" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black/50 text-white border-white/30 backdrop-blur-sm">{obra.genero}</Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#009c3b] transition-colors truncate">{obra.titulo}</h3>
        <p className="text-sm text-gray-600 mb-2">por {obra.autor.username}</p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{obra.descricao}</p>
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>{obra.visualizacoes}</span></div>
          <div className="flex items-center gap-1"><Heart className="w-3 h-3" /><span>{obra.curtidas}</span></div>
          <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{obra.tempoLeitura}</span></div>
        </div>
        <Link href={`/obra/${obra.id}`} passHref>
          <Button asChild className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90"><a>Leia agora</a></Button>
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <main className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-8 pb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Bem-vindo de volta! 👋</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Continue sua jornada literária e descubra novas histórias cearenses</p>
        </section>  

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {estatisticas.map((stat) => (
              <Card key={stat.chave} className={`border-2 ${stat.corBorda} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{valoresEstatisticas[stat.chave] ?? "--"}</p>
                    <p className="text-sm text-gray-600">{stat.rotulo}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.corFundo} flex items-center justify-center`}>
                    <stat.icone className={`w-6 h-6 ${stat.cor}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Obras Publicadas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{obras.map(renderCardObra)}</div>
        </section>
      </div>
    </main>
  )
}
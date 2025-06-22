"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Star, TrendingUp, Eye, Heart, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function DashboardInicial() {
  // Featured works data
  const obrasDestaque = [
    {
      id: 1,
      titulo: "Sertão Digital",
      autor: "Maria Santos",
      descricao:
        "Em um futuro próximo, o sertão cearense se transforma em um hub tecnológico, mas as tradições ancestrais resistem.",
      genero: "Ficção Científica",
      visualizacoes: 1250,
      curtidas: 89,
      tempoLeitura: "15 min",
      corCapa: "bg-gradient-to-br from-blue-500 to-teal-500",
    },
    {
      id: 2,
      titulo: "A Rendeira de Aquiraz",
      autor: "Ana Costa",
      descricao:
        "Uma jovem rendeira descobre o amor através dos fios que tece, em uma história que entrelaça tradição e paixão.",
      genero: "Romance",
      visualizacoes: 2100,
      curtidas: 156,
      tempoLeitura: "12 min",
      corCapa: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      id: 3,
      titulo: "Memórias do Açude",
      autor: "João Oliveira",
      descricao: "As lembranças de uma família que viveu às margens do açude, entre tempos de fartura e escassez.",
      genero: "Drama",
      visualizacoes: 890,
      curtidas: 67,
      tempoLeitura: "20 min",
      corCapa: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
  ]

  // Recent works data
  const obrasRecentes = [
    {
      id: 4,
      titulo: "Contos do Cariri",
      autor: "Carlos Mendes",
      descricao: "Histórias ancestrais que ecoam pelas serras do Cariri, preservando a sabedoria e o folclore.",
      genero: "Folclore",
      visualizacoes: 1450,
      curtidas: 98,
      tempoLeitura: "8 min",
      corCapa: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      id: 5,
      titulo: "Vento Norte",
      autor: "Lucia Ferreira",
      descricao: "A jornada de uma família em busca de melhores condições de vida no Nordeste.",
      genero: "Drama",
      visualizacoes: 756,
      curtidas: 45,
      tempoLeitura: "18 min",
      corCapa: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
    {
      id: 6,
      titulo: "Noites de Forró",
      autor: "Roberto Silva",
      descricao: "O amor floresce ao som do forró nas noites cearenses, celebrando nossa cultura.",
      genero: "Romance",
      visualizacoes: 1890,
      curtidas: 134,
      tempoLeitura: "10 min",
      corCapa: "bg-gradient-to-br from-red-500 to-pink-500",
    },
  ]

  // Stats data
  const estatisticas = [
    {
      icone: BookOpen,
      valor: "500+",
      rotulo: "Obras Publicadas",
      cor: "text-blue-600",
      corFundo: "bg-blue-50",
      corBorda: "border-blue-200",
    },
    {
      icone: Users,
      valor: "150+",
      rotulo: "Escritores Ativos",
      cor: "text-green-600",
      corFundo: "bg-green-50",
      corBorda: "border-green-200",
    },
    {
      icone: Star,
      valor: "2.5k+",
      rotulo: "Avaliações",
      cor: "text-yellow-600",
      corFundo: "bg-yellow-50",
      corBorda: "border-yellow-200",
    },
    {
      icone: TrendingUp,
      valor: "10k+",
      rotulo: "Leituras",
      cor: "text-purple-600",
      corFundo: "bg-purple-50",
      corBorda: "border-purple-200",
    },
  ]

  return (
    <main className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção de Boas-vindas */}
        <section className="pt-8 pb-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Bem-vindo de volta! 👋</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Continue sua jornada literária e descubra novas histórias cearenses
            </p>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {estatisticas.map((stat, index) => (
              <Card
                key={index}
                className={`border-2 ${stat.corBorda} hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.valor}</p>
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

        {/* Seção de Destaques */}
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
            {obrasDestaque.map((obra) => (
              <Card
                key={obra.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className={`h-48 ${obra.corCapa} relative flex items-center justify-center`}>
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
                  <p className="text-sm text-gray-600 mb-2">por {obra.autor}</p>
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
            ))}
          </div>
        </section>

        {/* Seção de Obras Recentes */}
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
            {obrasRecentes.map((obra) => (
              <Card
                key={obra.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className={`h-40 ${obra.corCapa} relative flex items-center justify-center`}>
                  <BookOpen className="w-12 h-12 text-white/80" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      {obra.genero}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#009c3b] transition-colors">
                    {obra.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">por {obra.autor}</p>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{obra.descricao}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{obra.visualizacoes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{obra.curtidas}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{obra.tempoLeitura}</span>
                    </div>
                  </div>

                  <Link href={`/obra/${obra.id}`}>
                    <Button size="sm" className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
                      Ler obra
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

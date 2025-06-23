"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Star, Eye, Heart, Clock } from "lucide-react"
import Link from "next/link"

export function ObrasDestaque() {
  const obrasDestaque = [
    {
      id: 1,
      titulo: "Sertão Digital",
      autor: "Maria Santos",
      avatarAutor: "/placeholder.svg?height=40&width=40",
      genero: "Ficção Científica",
      sinopse:
        "Uma visão futurista do sertão cearense, onde tradição e tecnologia se encontram em uma narrativa envolvente sobre identidade e progresso.",
      visualizacoes: 1250,
      curtidas: 89,
      avaliacao: 4.8,
      tempoLeitura: "15 min",
      corCapa: "bg-gradient-to-br from-blue-500 to-teal-500",
      tags: ["Tecnologia", "Nordeste", "Futuro"],
    },
    {
      id: 2,
      titulo: "A Rendeira de Aquiraz",
      autor: "Ana Costa",
      avatarAutor: "/placeholder.svg?height=40&width=40",
      genero: "Romance",
      sinopse:
        "Uma história de amor que atravessa gerações, contada através dos fios delicados da renda de bilro e das tradições familiares.",
      visualizacoes: 890,
      curtidas: 67,
      avaliacao: 4.5,
      tempoLeitura: "12 min",
      corCapa: "bg-gradient-to-br from-pink-500 to-rose-500",
      tags: ["Tradição", "Amor", "Família"],
    },
    {
      id: 3,
      titulo: "Memórias do Açude",
      autor: "João Oliveira",
      avatarAutor: "/placeholder.svg?height=40&width=40",
      genero: "Drama",
      sinopse:
        "As lembranças de um homem que cresceu às margens de um açude, testemunhando as transformações de sua comunidade ao longo dos anos.",
      visualizacoes: 654,
      curtidas: 43,
      avaliacao: 4.3,
      tempoLeitura: "18 min",
      corCapa: "bg-gradient-to-br from-amber-500 to-orange-500",
      tags: ["Memória", "Comunidade", "Nostalgia"],
    },
    {
      id: 4,
      titulo: "Contos do Cariri",
      autor: "Carlos Mendes",
      avatarAutor: "/placeholder.svg?height=40&width=40",
      genero: "Folclore",
      sinopse:
        "Uma coletânea de contos que resgatam as lendas e tradições do Cariri cearense, misturando realidade e fantasia.",
      visualizacoes: 432,
      curtidas: 38,
      avaliacao: 4.6,
      tempoLeitura: "10 min",
      corCapa: "bg-gradient-to-br from-green-500 to-emerald-500",
      tags: ["Folclore", "Lendas", "Cariri"],
    },
    {
      id: 5,
      titulo: "Vento Norte",
      autor: "Lucia Ferreira",
      avatarAutor: "/placeholder.svg?height=40&width=40",
      genero: "Drama",
      sinopse:
        "A jornada de uma mulher que deixa o interior para buscar oportunidades na capital, enfrentando os desafios da vida urbana.",
      visualizacoes: 789,
      curtidas: 56,
      avaliacao: 4.7,
      tempoLeitura: "20 min",
      corCapa: "bg-gradient-to-br from-purple-500 to-indigo-500",
      tags: ["Migração", "Mulher", "Cidade"],
    },
    {
      id: 6,
      titulo: "Noites de Forró",
      autor: "Roberto Silva",
      avatarAutor: "/placeholder.svg?height=40&width=40",
      genero: "Romance",
      sinopse:
        "O amor floresce ao som do forró em uma pequena cidade do interior, onde a música une corações e desperta paixões.",
      visualizacoes: 567,
      curtidas: 41,
      avaliacao: 4.4,
      tempoLeitura: "14 min",
      corCapa: "bg-gradient-to-br from-red-500 to-pink-500",
      tags: ["Música", "Forró", "Interior"],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#131313] mb-4">Obras em Destaque</h2>
          <p className="text-lg text-[#6e6e6e] max-w-2xl mx-auto">
            Descubra as histórias mais populares e bem avaliadas da nossa comunidade literária cearense
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {obrasDestaque.map((obra) => (
            <Card key={obra.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Capa da Obra */}
              <div className={`w-full h-48 ${obra.corCapa} flex items-center justify-center relative`}>
                <BookOpen className="w-16 h-16 text-white/80" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white border-white/30">{obra.genero}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-xs text-white">{obra.tempoLeitura}</span>
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={obra.avatarAutor || "/placeholder.svg"} alt={obra.autor} />
                    <AvatarFallback>
                      {obra.autor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-[#131313]">{obra.autor}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-[#6e6e6e]">{obra.avaliacao}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#131313] mb-2">{obra.titulo}</h3>
                <p className="text-sm text-[#6e6e6e] mb-4 line-clamp-3">{obra.sinopse}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {obra.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Estatísticas */}
                <div className="flex items-center justify-between text-sm text-[#6e6e6e] mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{obra.visualizacoes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{obra.curtidas}</span>
                    </div>
                  </div>
                </div>

                {/* Botão de Leitura */}
                <Link href={`/obra/${obra.id}`}>
                  <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Ler Obra</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Botão Ver Todas */}
        <div className="text-center">
          <Link href="/explorar">
            <Button
              variant="outline"
              className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white px-8 py-3"
            >
              Ver Todas as Obras
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

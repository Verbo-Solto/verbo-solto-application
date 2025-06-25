"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Eye, Clock } from "lucide-react"
import Link from "next/link"

interface ObrasRelacionadasProps {
  obraId: string
}

export function ObrasRelacionadas({ obraId }: ObrasRelacionadasProps) {
  // Dados mockados de obras relacionadas
  const obrasRelacionadas = [
    {
      id: "2",
      titulo: "Memórias do Futuro",
      autor: "Pedro Oliveira",
      avatarAutor: "/placeholder.svg?height=32&width=32",
      genero: "Ficção Científica",
      tags: ["Tecnologia", "Memória", "IA"],
      avaliacao: 4.6,
      visualizacoes: 890,
      tempoLeitura: "12 min",
      resumo: "Uma jornada através das memórias digitais de uma IA que questiona sua própria existência.",
      capa: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "3",
      titulo: "O Último Vaqueiro",
      autor: "Ana Ribeiro",
      avatarAutor: "/placeholder.svg?height=32&width=32",
      genero: "Drama",
      tags: ["Tradição", "Nordeste", "Família"],
      avaliacao: 4.9,
      visualizacoes: 1450,
      tempoLeitura: "18 min",
      resumo: "A história de um vaqueiro que luta para preservar suas tradições em um mundo em transformação.",
      capa: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "4",
      titulo: "Códigos do Sertão",
      autor: "Lucas Fernandes",
      avatarAutor: "/placeholder.svg?height=32&width=32",
      genero: "Ficção Científica",
      tags: ["Programação", "Cultura", "Inovação"],
      avaliacao: 4.4,
      visualizacoes: 720,
      tempoLeitura: "10 min",
      resumo: "Um programador descobre que os padrões de código podem ser encontrados na cultura popular nordestina.",
      capa: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "5",
      titulo: "Inteligência Artificial do Cordel",
      autor: "Francisca Lima",
      avatarAutor: "/placeholder.svg?height=32&width=32",
      genero: "Ficção Científica",
      tags: ["IA", "Literatura", "Tradição"],
      avaliacao: 4.7,
      visualizacoes: 1100,
      tempoLeitura: "14 min",
      resumo: "Uma IA aprende a criar cordéis e descobre a alma da literatura popular brasileira.",
      capa: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#131313] mb-6">Obras Relacionadas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {obrasRelacionadas.map((obra) => (
          <Link key={obra.id} href={`/obra/${obra.id}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex gap-4">
                <div className="w-20 h-28 bg-[#f4f4f4] rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={obra.capa || "/placeholder.svg"}
                    alt={`Capa de ${obra.titulo}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-[#6e6e6e] mb-2">
                    <Badge variant="outline" className="text-xs">
                      {obra.genero}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-[#131313] mb-2 line-clamp-2">{obra.titulo}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={obra.avatarAutor || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {obra.autor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#6e6e6e]">{obra.autor}</span>
                  </div>

                  <p className="text-sm text-[#6e6e6e] mb-3 line-clamp-2">{obra.resumo}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {obra.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#6e6e6e]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {obra.avaliacao}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {obra.visualizacoes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {obra.tempoLeitura}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link href="/explorar">
          <button className="text-[#009c3b] hover:text-[#007a2e] font-medium">Ver mais obras relacionadas →</button>
        </Link>
      </div>
    </div>
  )
}

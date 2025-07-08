"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, BookOpen, User, MapPin, Calendar, Eye } from "lucide-react"
import Link from "next/link"

interface Obra {
  id: number
  titulo: string
  capa: string
  autor: {
    username: string
  }
  genero: string
  cidade: string
  tags: string[]
  resumo: string
  curtidas: number
  comentarios: number
  visualizacoes: number
  dataPublicacao: string
  tempoLeitura: string
}

interface GradeObrasProps {
  obras: Obra[]
}

export function GradeObras({ obras }: GradeObrasProps) {
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (obras.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-[#e5e5e5] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[#131313] mb-2">Nenhuma obra encontrada</h3>
        <p className="text-[#6e6e6e] mb-4">Tente ajustar os filtros ou buscar por outros termos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {obras.map((obra) => (
        <div
          key={obra.id}
          className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <Link href={`/obra/${obra.id}`}>
            <div className="relative h-48 w-full">
              <img
                src={obra.capa || "/placeholder.svg"} // Use um placeholder se não houver capa
                alt={`Capa da obra ${obra.titulo}`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-[#131313] mb-2 truncate">{obra.titulo}</h3>
              <p className="text-sm text-[#6e6e6e] mb-2">por {obra.autor.username}</p>
              <Badge variant="secondary">{obra.genero}</Badge>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

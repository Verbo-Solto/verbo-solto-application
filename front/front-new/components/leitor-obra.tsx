"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import {
  Heart,
  MessageCircle,
  Star,
  Share2,
  Bookmark,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  Settings,
  Users,
} from "lucide-react"

interface LeitorObraProps {
  obraId: string
}

export function LeitorObra({ obraId }: LeitorObraProps) {
  const [obra, setObra] = useState<any>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [curtiu, setCurtiu] = useState(false)
  const [salvou, setSalvou] = useState(false)
  const [tamanhoFonte, setTamanhoFonte] = useState(16)
  const [progressoLeitura, setProgressoLeitura] = useState(35)

  // Buscar dados da obra da API
  useEffect(() => {
    setCarregando(true)
    setErro(null)
    axios
      .get(`http://localhost:8000/api/obras/${obraId}/`)
      .then((resp) => {
        setObra(resp.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro("Obra não encontrada.")
        setCarregando(false)
      })
  }, [obraId])

  // Rastreamento do progresso de leitura
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgressoLeitura(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (carregando) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-[#6e6e6e]">Carregando obra...</p>
        </div>
      </div>
    )
  }

  if (erro || !obra) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-500">{erro || "Obra não encontrada."}</p>
        </div>
      </div>
    )
  }

  const tempoEstimadoLeitura = Math.ceil(obra.conteudo.length / 200) // 200 palavras por minuto

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho da Obra */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#6e6e6e] mb-4">
          <span>{obra.genero}</span>
          <span>•</span>
          <span>{obra.cidade}</span>
          <span>•</span>
          <span>{obra.publicadoEm}</span>
        </div>

        <h1 className="text-4xl font-bold text-[#131313] mb-4">{obra.titulo}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {obra.tags?.map((tag: any) => (
            <Badge key={tag.id} variant="outline">
              {tag.nome}
            </Badge>
          ))}
        </div>

        {/* Informações do Autor */}
        <div className="flex items-center justify-between mb-6 p-4 bg-[#f4f4f4] rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                {(obra.autor?.username ?? "")
                  .split(" ")
                  .map((n: any) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-[#131313]">{obra.autor?.username}</h3>
              <p className="text-sm text-[#6e6e6e]">{obra.autor?.first_name}</p>
              <div className="flex items-center gap-4 text-xs text-[#6e6e6e] mt-1">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  0 seguidores
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white">
            Seguir
          </Button>
        </div>

        {/* Estatísticas da Obra */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6 text-sm text-[#6e6e6e]">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {obra.visualizacoes} visualizações
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {obra.tempo_leitura || "5 min"} de leitura
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {obra.avaliacao_media || 0} ({obra.total_avaliacoes || 0} avaliações)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurtiu(!curtiu)}
              className={curtiu ? "text-red-500" : "text-[#6e6e6e]"}
            >
              <Heart className={`w-5 h-5 ${curtiu ? "fill-current" : ""}`} />
            </Button>
            <span className="text-sm text-[#6e6e6e]">{obra.curtidas + (curtiu ? 1 : 0)}</span>

            <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <span className="text-sm text-[#6e6e6e]">{obra.comentarios}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSalvou(!salvou)}
              className={salvou ? "text-[#009c3b]" : "text-[#6e6e6e]"}
            >
              <Bookmark className={`w-5 h-5 ${salvou ? "fill-current" : ""}`} />
            </Button>

            <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progresso de Leitura */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#6e6e6e]">Progresso da leitura</span>
            <span className="text-[#009c3b] font-medium">{Math.round(progressoLeitura)}%</span>
          </div>
          <Progress value={progressoLeitura} className="h-2" />
        </div>
      </div>

      {/* Controles de Leitura */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white border border-[#e2e2e2] rounded-lg sticky top-20 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" disabled>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-[#6e6e6e]">Capítulo Único</span>
          <Button variant="ghost" size="icon" disabled>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setTamanhoFonte(Math.max(12, tamanhoFonte - 2))}>
              A-
            </Button>
            <span className="text-sm text-[#6e6e6e]">{tamanhoFonte}px</span>
            <Button variant="ghost" size="sm" onClick={() => setTamanhoFonte(Math.min(24, tamanhoFonte + 2))}>
              A+
            </Button>
          </div>
          <div className="text-sm text-[#6e6e6e]">~{tempoEstimadoLeitura} min restantes</div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Conteúdo da Obra */}
      <Card className="p-8 mb-8">
        <div
          className="prose prose-lg max-w-none text-[#131313] leading-relaxed"
          style={{ fontSize: `${tamanhoFonte}px` }}
        >
          {obra.conteudo ? (
            obra.conteudo.split("\n\n").map((paragrafo: any, index: any) => (
              <p key={index} className="mb-6">
                {paragrafo.trim()}
              </p>
            ))
          ) : (
            <p className="text-[#6e6e6e] italic">Conteúdo não disponível</p>
          )}
        </div>
      </Card>

      {/* Seção de Avaliação */}
      <Card className="p-6 mb-8">
        <h3 className="font-semibold text-[#131313] mb-4">Avalie esta obra</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Button key={i} variant="ghost" size="icon" className="w-8 h-8 p-0 hover:bg-transparent">
                <Star className="w-6 h-6 text-gray-300 hover:text-yellow-500 transition-colors" />
              </Button>
            ))}
          </div>
          <span className="text-sm text-[#6e6e6e]">Clique nas estrelas para avaliar</span>
        </div>
      </Card>
    </div>
  )
}

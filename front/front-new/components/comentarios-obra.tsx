"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, MoreHorizontal, Flag } from "lucide-react"

interface ComentariosObraProps {
  obraId: string
}

export function ComentariosObra({ obraId }: ComentariosObraProps) {
  const [novoComentario, setNovoComentario] = useState("")
  const [comentarios, setComentarios] = useState([
    {
      id: "1",
      autor: "João Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      conteudo: "Que história incrível! A forma como a autora mistura tecnologia com tradição é simplesmente genial.",
      dataPublicacao: "2 horas atrás",
      curtidas: 12,
      respostas: 3,
      curtiu: false,
    },
    {
      id: "2",
      autor: "Ana Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      conteudo:
        "Me emocionei com a parte da Dona Maria Conceição vendo o marido na realidade aumentada. Muito tocante!",
      dataPublicacao: "5 horas atrás",
      curtidas: 8,
      respostas: 1,
      curtiu: true,
    },
    {
      id: "3",
      autor: "Carlos Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      conteudo: "Excelente reflexão sobre o futuro do Nordeste. Como cearense, me sinto representado nesta narrativa.",
      dataPublicacao: "1 dia atrás",
      curtidas: 15,
      respostas: 5,
      curtiu: false,
    },
  ])

  const adicionarComentario = () => {
    if (novoComentario.trim()) {
      const comentario = {
        id: Date.now().toString(),
        autor: "Você",
        avatar: "/placeholder.svg?height=32&width=32",
        conteudo: novoComentario,
        dataPublicacao: "Agora",
        curtidas: 0,
        respostas: 0,
        curtiu: false,
      }
      setComentarios([comentario, ...comentarios])
      setNovoComentario("")
    }
  }

  const curtirComentario = (id: string) => {
    setComentarios(
      comentarios.map((comentario) =>
        comentario.id === id
          ? {
              ...comentario,
              curtiu: !comentario.curtiu,
              curtidas: comentario.curtiu ? comentario.curtidas - 1 : comentario.curtidas + 1,
            }
          : comentario,
      ),
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-[#131313] mb-6">Comentários ({comentarios.length})</h2>

      {/* Formulário de Novo Comentário */}
      <Card className="p-6 mb-6">
        <div className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>Eu</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Compartilhe seus pensamentos sobre esta obra..."
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              className="mb-4 min-h-[100px] resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6e6e6e]">{novoComentario.length}/500 caracteres</span>
              <Button
                onClick={adicionarComentario}
                disabled={!novoComentario.trim()}
                className="bg-[#009c3b] hover:bg-[#007a2e] text-white"
              >
                Comentar
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Lista de Comentários */}
      <div className="space-y-4">
        {comentarios.map((comentario) => (
          <Card key={comentario.id} className="p-6">
            <div className="flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comentario.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {comentario.autor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-[#131313]">{comentario.autor}</h4>
                    <span className="text-sm text-[#6e6e6e]">{comentario.dataPublicacao}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-[#131313] mb-4 leading-relaxed">{comentario.conteudo}</p>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => curtirComentario(comentario.id)}
                    className={`gap-2 ${comentario.curtiu ? "text-red-500" : "text-[#6e6e6e]"}`}
                  >
                    <Heart className={`w-4 h-4 ${comentario.curtiu ? "fill-current" : ""}`} />
                    {comentario.curtidas}
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 text-[#6e6e6e]">
                    <MessageCircle className="w-4 h-4" />
                    {comentario.respostas > 0 ? `${comentario.respostas} respostas` : "Responder"}
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 text-[#6e6e6e] ml-auto">
                    <Flag className="w-4 h-4" />
                    Denunciar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Botão Carregar Mais */}
      <div className="text-center mt-6">
        <Button variant="outline" className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white">
          Carregar mais comentários
        </Button>
      </div>
    </div>
  )
}

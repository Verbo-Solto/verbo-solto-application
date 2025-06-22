"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Reply, Flag, Star } from "lucide-react"

interface WorkCommentsProps {
  workId: string
}

export function WorkComments({ workId }: WorkCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)

  const comments = [
    {
      id: 1,
      author: "João Silva",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "Que história incrível! A forma como a autora mistura tradição e tecnologia é simplesmente brilhante. Me emocionei com a parte da Dona Maria Conceição.",
      time: "2 horas atrás",
      likes: 12,
      rating: 5,
      replies: [
        {
          id: 2,
          author: "Ana Costa",
          authorAvatar: "/placeholder.svg?height=32&width=32",
          content: "Concordo completamente! Essa parte foi muito tocante.",
          time: "1 hora atrás",
          likes: 3,
        },
      ],
    },
    {
      id: 3,
      author: "Pedro Oliveira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      content:
        "Excelente narrativa! Como cearense, me senti representado na história. A descrição de Quixadá ficou perfeita.",
      time: "5 horas atrás",
      likes: 8,
      rating: 4,
      replies: [],
    },
    {
      id: 4,
      author: "Lucia Ferreira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      content: "Uma obra que nos faz refletir sobre o futuro sem esquecer nossas raízes. Parabéns à autora!",
      time: "1 dia atrás",
      likes: 15,
      rating: 5,
      replies: [],
    },
  ]

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Implementar lógica de envio do comentário
      console.log("New comment:", newComment)
      setNewComment("")
      setReplyTo(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-[#131313] mb-6">Comentários ({comments.length})</h3>

        {/* New Comment Form */}
        <div className="mb-8">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>EU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Compartilhe sua opinião sobre esta obra..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3 resize-none"
                rows={3}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6e6e6e]">Avaliação:</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Button key={i} variant="ghost" size="icon" className="w-6 h-6 p-0 hover:bg-transparent">
                        <Star className="w-4 h-4 text-gray-300 hover:text-yellow-500 transition-colors" />
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={handleSubmitComment}
                  className="bg-[#009c3b] hover:bg-[#009c3b]/90"
                  disabled={!newComment.trim()}
                >
                  Comentar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-[#e2e2e2] pb-6 last:border-b-0">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-[#131313]">{comment.author}</span>
                    <span className="text-sm text-[#6e6e6e]">{comment.time}</span>
                    {comment.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < comment.rating! ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-[#131313] mb-3">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-[#6e6e6e] hover:text-[#009c3b] p-0">
                      <Heart className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#6e6e6e] hover:text-[#009c3b] p-0"
                      onClick={() => setReplyTo(comment.id)}
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      Responder
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[#6e6e6e] hover:text-red-500 p-0">
                      <Flag className="w-4 h-4 mr-1" />
                      Denunciar
                    </Button>
                  </div>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {reply.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-[#131313] text-sm">{reply.author}</span>
                              <span className="text-xs text-[#6e6e6e]">{reply.time}</span>
                            </div>
                            <p className="text-[#131313] text-sm mb-2">{reply.content}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#6e6e6e] hover:text-[#009c3b] p-0 text-xs"
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyTo === comment.id && (
                    <div className="mt-4 ml-6">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback className="text-xs">EU</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder={`Respondendo para ${comment.author}...`}
                            className="mb-2 resize-none text-sm"
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-[#009c3b] hover:bg-[#009c3b]/90">
                              Responder
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

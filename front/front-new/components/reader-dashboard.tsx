"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Heart, Star, Clock, Users } from "lucide-react"

export function ReaderDashboard() {
  const [activeTab, setActiveTab] = useState("feed")

  const readingStats = {
    booksRead: 24,
    totalReadingTime: "48h 32m",
    favoriteGenre: "Romance",
    following: 12,
    reviews: 18,
  }

  const recentReads = [
    {
      id: 1,
      title: "Sertão Digital",
      author: "Maria Santos",
      progress: 85,
      lastRead: "Ontem",
      rating: 5,
      cover: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 2,
      title: "A Rendeira de Aquiraz",
      author: "Ana Costa",
      progress: 100,
      lastRead: "3 dias atrás",
      rating: 4,
      cover: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 3,
      title: "Memórias do Açude",
      author: "João Oliveira",
      progress: 45,
      lastRead: "1 semana atrás",
      rating: 0,
      cover: "/placeholder.svg?height=80&width=60",
    },
  ]

  const feedItems = [
    {
      type: "new_work",
      author: "Maria Santos",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      title: "Novas Aventuras no Sertão",
      time: "2 horas atrás",
      genre: "Aventura",
    },
    {
      type: "review",
      author: "Pedro Silva",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      title: "Sertão Digital",
      time: "5 horas atrás",
      rating: 5,
      review: "Uma obra incrível que mistura tradição e modernidade de forma única...",
    },
    {
      type: "milestone",
      author: "Ana Costa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      title: "A Rendeira de Aquiraz",
      time: "1 dia atrás",
      milestone: "1000 leituras",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Olá, João! 📚</h1>
        <p className="text-[#6e6e6e]">
          Bem-vindo ao seu painel de leitor. Continue sua jornada literária e descubra novas histórias.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="p-4 text-center">
          <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.booksRead}</div>
          <div className="text-sm text-[#6e6e6e]">Obras Lidas</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-lg font-bold text-[#131313]">{readingStats.totalReadingTime}</div>
          <div className="text-sm text-[#6e6e6e]">Tempo Lendo</div>
        </Card>
        <Card className="p-4 text-center">
          <Star className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.reviews}</div>
          <div className="text-sm text-[#6e6e6e]">Avaliações</div>
        </Card>
        <Card className="p-4 text-center">
          <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.following}</div>
          <div className="text-sm text-[#6e6e6e]">Seguindo</div>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-lg font-bold text-[#131313]">{readingStats.favoriteGenre}</div>
          <div className="text-sm text-[#6e6e6e]">Gênero Favorito</div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "feed" ? "default" : "ghost"}
          onClick={() => setActiveTab("feed")}
          className={activeTab === "feed" ? "bg-white shadow-sm" : ""}
        >
          Feed
        </Button>
        <Button
          variant={activeTab === "reading" ? "default" : "ghost"}
          onClick={() => setActiveTab("reading")}
          className={activeTab === "reading" ? "bg-white shadow-sm" : ""}
        >
          Minhas Leituras
        </Button>
        <Button
          variant={activeTab === "favorites" ? "default" : "ghost"}
          onClick={() => setActiveTab("favorites")}
          className={activeTab === "favorites" ? "bg-white shadow-sm" : ""}
        >
          Favoritos
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "feed" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-[#131313]">Atividades Recentes</h3>
            {feedItems.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={item.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {item.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-[#131313]">{item.author}</span>
                      <span className="text-sm text-[#6e6e6e]">•</span>
                      <span className="text-sm text-[#6e6e6e]">{item.time}</span>
                    </div>

                    {item.type === "new_work" && (
                      <div>
                        <p className="text-[#131313] mb-2">
                          Publicou uma nova obra: <span className="font-medium">"{item.title}"</span>
                        </p>
                        <Badge variant="secondary">{item.genre}</Badge>
                      </div>
                    )}

                    {item.type === "review" && (
                      <div>
                        <p className="text-[#131313] mb-2">
                          Avaliou <span className="font-medium">"{item.title}"</span>
                        </p>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < item.rating! ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#6e6e6e] italic">"{item.review}"</p>
                      </div>
                    )}

                    {item.type === "milestone" && (
                      <div>
                        <p className="text-[#131313]">
                          <span className="font-medium">"{item.title}"</span> alcançou {item.milestone}!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Continue Reading */}
            <Card className="p-6">
              <h4 className="font-semibold text-[#131313] mb-4">Continue Lendo</h4>
              <div className="space-y-4">
                {recentReads
                  .filter((book) => book.progress < 100)
                  .map((book) => (
                    <div key={book.id} className="flex gap-3">
                      <div className="w-12 h-16 bg-[#f4f4f4] rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <h5 className="font-medium text-[#131313] text-sm mb-1">{book.title}</h5>
                        <p className="text-xs text-[#6e6e6e] mb-2">{book.author}</p>
                        <div className="w-full bg-[#f4f4f4] rounded-full h-2">
                          <div className="bg-[#009c3b] h-2 rounded-full" style={{ width: `${book.progress}%` }}></div>
                        </div>
                        <p className="text-xs text-[#6e6e6e] mt-1">{book.progress}% concluído</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6">
              <h4 className="font-semibold text-[#131313] mb-4">Recomendações</h4>
              <div className="space-y-3">
                <div className="p-3 bg-[#f4f4f4] rounded-lg">
                  <h5 className="font-medium text-[#131313] text-sm mb-1">Contos do Cariri</h5>
                  <p className="text-xs text-[#6e6e6e] mb-2">Por Carlos Mendes</p>
                  <Badge variant="outline" className="text-xs">
                    Folclore
                  </Badge>
                </div>
                <div className="p-3 bg-[#f4f4f4] rounded-lg">
                  <h5 className="font-medium text-[#131313] text-sm mb-1">Vento Norte</h5>
                  <p className="text-xs text-[#6e6e6e] mb-2">Por Lucia Ferreira</p>
                  <Badge variant="outline" className="text-xs">
                    Drama
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "reading" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Minhas Leituras</h3>
          <div className="grid gap-6">
            {recentReads.map((book) => (
              <Card key={book.id} className="p-6">
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-[#f4f4f4] rounded flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-[#131313]">{book.title}</h4>
                        <p className="text-[#6e6e6e]">{book.author}</p>
                      </div>
                      <Badge
                        variant={book.progress === 100 ? "default" : "secondary"}
                        className={book.progress === 100 ? "bg-[#009c3b]" : ""}
                      >
                        {book.progress === 100 ? "Concluído" : "Lendo"}
                      </Badge>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{book.progress}%</span>
                      </div>
                      <div className="w-full bg-[#f4f4f4] rounded-full h-2">
                        <div className="bg-[#009c3b] h-2 rounded-full" style={{ width: `${book.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#6e6e6e]">Última leitura: {book.lastRead}</span>
                      {book.rating > 0 && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < book.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "favorites" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Obras Favoritas</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReads
              .filter((book) => book.rating >= 4)
              .map((book) => (
                <Card key={book.id} className="p-6 text-center">
                  <div className="w-20 h-28 bg-[#f4f4f4] rounded mx-auto mb-4"></div>
                  <h4 className="font-semibold text-[#131313] mb-1">{book.title}</h4>
                  <p className="text-[#6e6e6e] text-sm mb-3">{book.author}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < book.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Ler Novamente
                  </Button>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

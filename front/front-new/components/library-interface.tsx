"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Heart, Star, Clock, Users, Filter, Grid, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function LibraryInterface() {
  const [activeTab, setActiveTab] = useState("reading")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const readingList = [
    {
      id: 1,
      title: "Sertão Digital",
      author: "Maria Santos",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      progress: 65,
      lastRead: "Ontem",
      rating: 0,
      genre: "Ficção Científica",
      estimatedTime: "8 min restantes",
      coverColor: "bg-gradient-to-br from-blue-500 to-teal-500",
    },
    {
      id: 2,
      title: "A Rendeira de Aquiraz",
      author: "Ana Costa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      progress: 30,
      lastRead: "2 dias atrás",
      rating: 0,
      genre: "Romance",
      estimatedTime: "25 min restantes",
      coverColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
  ]

  const finishedBooks = [
    {
      id: 3,
      title: "Memórias do Açude",
      author: "João Oliveira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      progress: 100,
      finishedAt: "1 semana atrás",
      rating: 5,
      genre: "Drama",
      coverColor: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      id: 4,
      title: "Contos do Cariri",
      author: "Carlos Mendes",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      progress: 100,
      finishedAt: "2 semanas atrás",
      rating: 4,
      genre: "Folclore",
      coverColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
  ]

  const favoriteBooks = [
    {
      id: 5,
      title: "Vento Norte",
      author: "Lucia Ferreira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      genre: "Drama",
      addedAt: "3 dias atrás",
      coverColor: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
    {
      id: 6,
      title: "Noites de Forró",
      author: "Roberto Silva",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      genre: "Romance",
      addedAt: "1 semana atrás",
      coverColor: "bg-gradient-to-br from-red-500 to-pink-500",
    },
  ]

  const readingStats = {
    booksRead: finishedBooks.length,
    booksReading: readingList.length,
    favoriteBooks: favoriteBooks.length,
    totalReadingTime: "48h 32m",
    averageRating: 4.5,
    readingStreak: 7,
  }

  const renderBookCard = (book: any, type: "reading" | "finished" | "favorite") => {
    if (viewMode === "list") {
      return (
        <Card key={book.id} className="p-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-20 ${book.coverColor} rounded flex items-center justify-center flex-shrink-0`}>
              <BookOpen className="w-8 h-8 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-[#131313]">{book.title}</h4>
                  <p className="text-sm text-[#6e6e6e]">por {book.author}</p>
                </div>
                <Badge variant="outline">{book.genre}</Badge>
              </div>

              {type === "reading" && (
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{book.progress}%</span>
                  </div>
                  <Progress value={book.progress} className="h-2" />
                  <p className="text-xs text-[#6e6e6e] mt-1">
                    Última leitura: {book.lastRead} • {book.estimatedTime}
                  </p>
                </div>
              )}

              {type === "finished" && (
                <div className="flex items-center gap-4 text-sm text-[#6e6e6e]">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < book.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span>Finalizado {book.finishedAt}</span>
                </div>
              )}

              {type === "favorite" && (
                <div className="flex items-center gap-4 text-sm text-[#6e6e6e]">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span>Favorito</span>
                  </div>
                  <span>Adicionado {book.addedAt}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/work/${book.id}`}>
                <Button variant="outline" size="sm">
                  {type === "reading" ? "Continuar" : "Ler"}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card key={book.id} className="overflow-hidden">
        <div className={`w-full h-48 ${book.coverColor} flex items-center justify-center`}>
          <BookOpen className="w-16 h-16 text-white/80" />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {book.genre}
            </Badge>
          </div>
          <h4 className="font-semibold text-[#131313] mb-1">{book.title}</h4>
          <p className="text-sm text-[#6e6e6e] mb-3">por {book.author}</p>

          {type === "reading" && (
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso</span>
                <span>{book.progress}%</span>
              </div>
              <Progress value={book.progress} className="h-2" />
              <p className="text-xs text-[#6e6e6e] mt-1">{book.estimatedTime}</p>
            </div>
          )}

          {type === "finished" && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < book.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}

          {type === "favorite" && (
            <div className="flex items-center gap-1 mb-3">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-sm text-[#6e6e6e]">Favorito</span>
            </div>
          )}

          <Link href={`/work/${book.id}`}>
            <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
              {type === "reading" ? "Continuar Lendo" : "Ler Novamente"}
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Minha Biblioteca</h1>
        <p className="text-[#6e6e6e]">Acompanhe suas leituras e descubra novas histórias</p>
      </div>

      {/* Reading Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-4 text-center">
          <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.booksRead}</div>
          <div className="text-sm text-[#6e6e6e]">Lidas</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-lg font-bold text-[#131313]">{readingStats.booksReading}</div>
          <div className="text-sm text-[#6e6e6e]">Lendo</div>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.favoriteBooks}</div>
          <div className="text-sm text-[#6e6e6e]">Favoritas</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-lg font-bold text-[#131313]">{readingStats.totalReadingTime}</div>
          <div className="text-sm text-[#6e6e6e]">Tempo Lendo</div>
        </Card>
        <Card className="p-4 text-center">
          <Star className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.averageRating}</div>
          <div className="text-sm text-[#6e6e6e]">Avaliação Média</div>
        </Card>
        <Card className="p-4 text-center">
          <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{readingStats.readingStreak}</div>
          <div className="text-sm text-[#6e6e6e]">Dias Seguidos</div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-[#f4f4f4] p-1 rounded-lg">
          <Button
            variant={activeTab === "reading" ? "default" : "ghost"}
            onClick={() => setActiveTab("reading")}
            className={activeTab === "reading" ? "bg-white shadow-sm" : ""}
          >
            Lendo ({readingList.length})
          </Button>
          <Button
            variant={activeTab === "finished" ? "default" : "ghost"}
            onClick={() => setActiveTab("finished")}
            className={activeTab === "finished" ? "bg-white shadow-sm" : ""}
          >
            Finalizadas ({finishedBooks.length})
          </Button>
          <Button
            variant={activeTab === "favorites" ? "default" : "ghost"}
            onClick={() => setActiveTab("favorites")}
            className={activeTab === "favorites" ? "bg-white shadow-sm" : ""}
          >
            Favoritas ({favoriteBooks.length})
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
            <Input placeholder="Buscar na biblioteca..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <div className="flex gap-1 bg-[#f4f4f4] p-1 rounded">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-white shadow-sm" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-white shadow-sm" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "reading" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Continue Lendo</h3>
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
            {readingList.map((book) => renderBookCard(book, "reading"))}
          </div>
        </div>
      )}

      {activeTab === "finished" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Obras Finalizadas</h3>
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
            {finishedBooks.map((book) => renderBookCard(book, "finished"))}
          </div>
        </div>
      )}

      {activeTab === "favorites" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Obras Favoritas</h3>
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
            {favoriteBooks.map((book) => renderBookCard(book, "favorite"))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Eye, Heart, MessageCircle, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

interface WorkGridProps {
  filters: {
    genre: string
    city: string
    tags: string[]
    sortBy: string
    search: string
  }
}

export function WorkGrid({ filters }: WorkGridProps) {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Mock data - in real app, fetch from API
  const allWorks = [
    {
      id: 1,
      title: "Sertão Digital",
      author: "Maria Santos",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Ficção Científica",
      tags: ["Tecnologia", "Nordeste", "Futuro"],
      excerpt: "Em um futuro próximo, o sertão cearense se transforma em um hub tecnológico...",
      readTime: "15 min",
      views: 1250,
      likes: 89,
      comments: 23,
      rating: 4.8,
      city: "Fortaleza",
      publishedAt: "2024-01-15",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      title: "Memórias do Açude",
      author: "João Oliveira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Drama",
      tags: ["Família", "Seca", "Memória"],
      excerpt: "As lembranças de uma família que viveu às margens do açude...",
      readTime: "22 min",
      views: 890,
      likes: 67,
      comments: 15,
      rating: 4.6,
      city: "Quixadá",
      publishedAt: "2024-01-10",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: 3,
      title: "A Rendeira de Aquiraz",
      author: "Ana Costa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Romance",
      tags: ["Tradição", "Amor", "Artesanato"],
      excerpt: "Uma jovem rendeira descobre o amor através dos fios que tece...",
      readTime: "18 min",
      views: 2100,
      likes: 156,
      comments: 42,
      rating: 4.9,
      city: "Aquiraz",
      publishedAt: "2024-01-12",
      createdAt: new Date("2024-01-12"),
    },
    {
      id: 4,
      title: "Contos do Cariri",
      author: "Carlos Mendes",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Folclore",
      tags: ["Tradição", "Lendas", "Cultura"],
      excerpt: "Histórias ancestrais que ecoam pelas serras do Cariri...",
      readTime: "12 min",
      views: 1450,
      likes: 98,
      comments: 28,
      rating: 4.7,
      city: "Crato",
      publishedAt: "2024-01-08",
      createdAt: new Date("2024-01-08"),
    },
    {
      id: 5,
      title: "Vento Norte",
      author: "Lucia Ferreira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Drama",
      tags: ["Família", "Migração", "Esperança"],
      excerpt: "A jornada de uma família em busca de melhores condições de vida...",
      readTime: "25 min",
      views: 756,
      likes: 45,
      comments: 12,
      rating: 4.4,
      city: "Sobral",
      publishedAt: "2024-01-05",
      createdAt: new Date("2024-01-05"),
    },
    {
      id: 6,
      title: "Noites de Forró",
      author: "Roberto Silva",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Romance",
      tags: ["Música", "Juventude", "Amor"],
      excerpt: "O amor floresce ao som do forró nas noites cearenses...",
      readTime: "16 min",
      views: 1890,
      likes: 134,
      comments: 35,
      rating: 4.8,
      city: "Fortaleza",
      publishedAt: "2024-01-03",
      createdAt: new Date("2024-01-03"),
    },
  ]

  const filterWorks = (works: any[]) => {
    let filtered = [...works]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (work) =>
          work.title.toLowerCase().includes(searchLower) ||
          work.author.toLowerCase().includes(searchLower) ||
          work.excerpt.toLowerCase().includes(searchLower) ||
          work.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Genre filter
    if (filters.genre) {
      filtered = filtered.filter((work) => work.genre === filters.genre)
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter((work) => work.city === filters.city)
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((work) => filters.tags.some((tag) => work.tags.includes(tag)))
    }

    // Sort
    switch (filters.sortBy) {
      case "recent":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "views":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const filtered = filterWorks(allWorks)
      setWorks(filtered as any)
      setLoading(false)
      setHasMore(filtered.length > 6) // Simulate pagination
    }, 500)
  }, [filters])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#f4f4f4] rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-[#f4f4f4] rounded mb-1"></div>
                <div className="h-3 bg-[#f4f4f4] rounded w-2/3"></div>
              </div>
            </div>
            <div className="h-6 bg-[#f4f4f4] rounded mb-2"></div>
            <div className="h-4 bg-[#f4f4f4] rounded mb-4"></div>
            <div className="h-10 bg-[#f4f4f4] rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (works.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-[#6e6e6e] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#131313] mb-2">Nenhuma obra encontrada</h3>
        <p className="text-[#6e6e6e] mb-4">Tente ajustar os filtros ou buscar por outros termos.</p>
        <Button variant="outline" className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white">
          Limpar Filtros
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#6e6e6e]">
          {works.length} obra{works.length !== 1 ? "s" : ""} encontrada{works.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work: any) => (
          <Card key={work.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={work.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {work.author
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-[#131313]">{work.author}</p>
                  <p className="text-sm text-[#6e6e6e]">{work.city}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{work.rating}</span>
                </div>
              </div>

              {/* Work Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {work.genre}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-[#6e6e6e]">
                    <Clock className="w-3 h-3" />
                    {work.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#131313] mb-2">{work.title}</h3>
                <p className="text-[#6e6e6e] text-sm line-clamp-3">{work.excerpt}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {work.tags.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-[#6e6e6e] mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {work.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {work.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {work.comments}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/work/${work.id}`}>
                <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Ler Obra</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
          >
            Carregar Mais Obras
          </Button>
        </div>
      )}
    </div>
  )
}

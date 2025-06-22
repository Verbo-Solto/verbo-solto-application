"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"
import Link from "next/link"

export function MyWorksInterface() {
  const [activeTab, setActiveTab] = useState("published")

  const stats = {
    totalWorks: 8,
    totalViews: 15420,
    totalLikes: 892,
    totalComments: 234,
    followers: 156,
    avgRating: 4.6,
  }

  const publishedWorks = [
    {
      id: 1,
      title: "Sertão Digital",
      status: "published",
      genre: "Ficção Científica",
      publishedAt: "2024-01-15",
      views: 1250,
      likes: 89,
      comments: 23,
      rating: 4.8,
      tags: ["Tecnologia", "Nordeste", "Futuro"],
    },
    {
      id: 3,
      title: "O Último Vaqueiro",
      status: "published",
      genre: "Aventura",
      publishedAt: "2024-01-10",
      views: 890,
      likes: 67,
      comments: 15,
      rating: 4.5,
      tags: ["Tradição", "Sertão"],
    },
    {
      id: 4,
      title: "Contos da Madrugada",
      status: "published",
      genre: "Crônica",
      publishedAt: "2024-01-05",
      views: 654,
      likes: 43,
      comments: 12,
      rating: 4.3,
      tags: ["Urbano", "Reflexão"],
    },
  ]

  const draftWorks = [
    {
      id: 2,
      title: "Memórias Perdidas",
      status: "draft",
      genre: "Drama",
      lastEdited: "2024-01-20",
      wordCount: 2340,
      progress: 45,
      tags: ["Família", "Memória"],
    },
    {
      id: 5,
      title: "Noites de Forró",
      status: "draft",
      genre: "Romance",
      lastEdited: "2024-01-18",
      wordCount: 1890,
      progress: 30,
      tags: ["Música", "Amor"],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#131313] mb-2">Minhas Obras</h1>
            <p className="text-[#6e6e6e]">Gerencie suas publicações e rascunhos</p>
          </div>
          <Link href="/write">
            <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Obra
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{stats.totalWorks}</div>
            <div className="text-sm text-[#6e6e6e]">Obras</div>
          </Card>
          <Card className="p-4 text-center">
            <Eye className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{stats.totalViews.toLocaleString()}</div>
            <div className="text-sm text-[#6e6e6e]">Visualizações</div>
          </Card>
          <Card className="p-4 text-center">
            <Heart className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{stats.totalLikes}</div>
            <div className="text-sm text-[#6e6e6e]">Curtidas</div>
          </Card>
          <Card className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{stats.totalComments}</div>
            <div className="text-sm text-[#6e6e6e]">Comentários</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{stats.followers}</div>
            <div className="text-sm text-[#6e6e6e]">Seguidores</div>
          </Card>
          <Card className="p-4 text-center">
            <Star className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#131313]">{stats.avgRating}</div>
            <div className="text-sm text-[#6e6e6e]">Avaliação</div>
          </Card>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "published" ? "default" : "ghost"}
          onClick={() => setActiveTab("published")}
          className={activeTab === "published" ? "bg-white shadow-sm" : ""}
        >
          Publicadas ({publishedWorks.length})
        </Button>
        <Button
          variant={activeTab === "drafts" ? "default" : "ghost"}
          onClick={() => setActiveTab("drafts")}
          className={activeTab === "drafts" ? "bg-white shadow-sm" : ""}
        >
          Rascunhos ({draftWorks.length})
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "ghost"}
          onClick={() => setActiveTab("analytics")}
          className={activeTab === "analytics" ? "bg-white shadow-sm" : ""}
        >
          Estatísticas
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "published" && (
        <div className="grid gap-6">
          {publishedWorks.map((work) => (
            <Card key={work.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-[#131313]">{work.title}</h4>
                    <Badge className="bg-[#009c3b]">Publicada</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#6e6e6e] mb-3">
                    <span>{work.genre}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(work.publishedAt).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {work.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-[#6e6e6e]">
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
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {work.rating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/work/${work.id}`}>
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/write?edit=${work.id}`}>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Mais opções">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "drafts" && (
        <div className="grid gap-6">
          {draftWorks.map((work) => (
            <Card key={work.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-[#131313]">{work.title}</h4>
                    <Badge variant="secondary">Rascunho</Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#6e6e6e] mb-3">
                    <span>{work.genre}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Editado em {new Date(work.lastEdited).toLocaleDateString("pt-BR")}
                    </div>
                    <span>•</span>
                    <span>{work.wordCount} palavras</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {work.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progresso estimado</span>
                      <span>{work.progress}%</span>
                    </div>
                    <Progress value={work.progress} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/write?draft=${work.id}`}>
                    <Button
                      variant="outline"
                      className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Continuar Escrevendo
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Excluir">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#009c3b]" />
              Crescimento de Visualizações
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Este mês</span>
                  <span>+2.3k visualizações</span>
                </div>
                <Progress value={85} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mês anterior</span>
                  <span>+1.8k visualizações</span>
                </div>
                <Progress value={65} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Obras Mais Populares</h3>
            <div className="space-y-3">
              {publishedWorks
                .sort((a, b) => b.views - a.views)
                .map((work) => (
                  <div key={work.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{work.title}</span>
                    <span className="text-sm text-[#6e6e6e]">{work.views} visualizações</span>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Engajamento por Gênero</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ficção Científica</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="w-20" />
                  <span className="text-sm text-[#6e6e6e]">90%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Aventura</span>
                <div className="flex items-center gap-2">
                  <Progress value={75} className="w-20" />
                  <span className="text-sm text-[#6e6e6e]">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Crônica</span>
                <div className="flex items-center gap-2">
                  <Progress value={60} className="w-20" />
                  <span className="text-sm text-[#6e6e6e]">60%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Metas de Escrita</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Obras publicadas este ano</span>
                  <span>3 / 5</span>
                </div>
                <Progress value={60} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Palavras escritas este mês</span>
                  <span>8.2k / 10k</span>
                </div>
                <Progress value={82} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

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
  TrendingUp,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  Calendar,
} from "lucide-react"
import { PublishWorkModal } from "@/components/publish-work-modal"

export function WriterDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showPublishModal, setShowPublishModal] = useState(false)

  const stats = {
    totalWorks: 12,
    totalViews: 15420,
    totalLikes: 892,
    totalComments: 234,
    followers: 156,
    avgRating: 4.6,
  }

  const myWorks = [
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
      id: 2,
      title: "Memórias Perdidas",
      status: "draft",
      genre: "Drama",
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      rating: 0,
      tags: ["Família", "Memória"],
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
  ]

  const recentActivity = [
    { type: "like", user: "Maria Santos", work: "Sertão Digital", time: "2 horas atrás" },
    { type: "comment", user: "João Silva", work: "O Último Vaqueiro", time: "5 horas atrás" },
    { type: "follow", user: "Ana Costa", work: null, time: "1 dia atrás" },
    { type: "rating", user: "Pedro Oliveira", work: "Sertão Digital", time: "2 dias atrás" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Olá, Maria! 👋</h1>
        <p className="text-[#6e6e6e]">
          Bem-vinda ao seu painel de escritor. Aqui você pode gerenciar suas obras e acompanhar seu progresso.
        </p>
      </div>

      {/* Quick Stats */}
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

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          onClick={() => setActiveTab("overview")}
          className={activeTab === "overview" ? "bg-white shadow-sm" : ""}
        >
          Visão Geral
        </Button>
        <Button
          variant={activeTab === "works" ? "default" : "ghost"}
          onClick={() => setActiveTab("works")}
          className={activeTab === "works" ? "bg-white shadow-sm" : ""}
        >
          Minhas Obras
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
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button
                className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90 justify-start"
                onClick={() => setShowPublishModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Obra
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Ver Estatísticas
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Atividade Recente</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-[#f4f4f4] rounded-lg">
                  <div className="w-8 h-8 bg-[#009c3b] rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.type === "like" && <Heart className="w-4 h-4 text-white" />}
                    {activity.type === "comment" && <MessageCircle className="w-4 h-4 text-white" />}
                    {activity.type === "follow" && <Users className="w-4 h-4 text-white" />}
                    {activity.type === "rating" && <Star className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#131313]">
                      <span className="font-medium">{activity.user}</span>
                      {activity.type === "like" && " curtiu sua obra "}
                      {activity.type === "comment" && " comentou em "}
                      {activity.type === "follow" && " começou a seguir você"}
                      {activity.type === "rating" && " avaliou "}
                      {activity.work && <span className="font-medium">"{activity.work}"</span>}
                    </p>
                    <p className="text-xs text-[#6e6e6e]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "works" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#131313]">Minhas Obras</h3>
            <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90" onClick={() => setShowPublishModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Obra
            </Button>
          </div>

          <div className="grid gap-6">
            {myWorks.map((work) => (
              <Card key={work.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-[#131313]">{work.title}</h4>
                      <Badge
                        variant={work.status === "published" ? "default" : "secondary"}
                        className={work.status === "published" ? "bg-[#009c3b]" : ""}
                      >
                        {work.status === "published" ? "Publicada" : "Rascunho"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#6e6e6e] mb-3">
                      <span>{work.genre}</span>
                      {work.publishedAt && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(work.publishedAt).toLocaleDateString("pt-BR")}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {work.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {work.status === "published" && (
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
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Crescimento de Seguidores</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Este mês</span>
                  <span>+23 seguidores</span>
                </div>
                <Progress value={75} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Mês anterior</span>
                  <span>+18 seguidores</span>
                </div>
                <Progress value={60} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Obras Mais Populares</h3>
            <div className="space-y-3">
              {myWorks
                .filter((w) => w.status === "published")
                .map((work) => (
                  <div key={work.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{work.title}</span>
                    <span className="text-sm text-[#6e6e6e]">{work.views} visualizações</span>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      )}
      {showPublishModal && <PublishWorkModal onClose={() => setShowPublishModal(false)} />}
    </div>
  )
}

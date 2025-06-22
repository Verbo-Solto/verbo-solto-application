"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, Calendar, BookOpen, Heart, Users, Edit, Camera, Settings, Shield } from "lucide-react"

export function ProfileInterface() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao@exemplo.com",
    bio: "Apaixonado por literatura cearense e histórias que conectam tradição e modernidade. Leitor voraz e escritor nas horas vagas.",
    city: "Fortaleza",
    joinDate: "Janeiro 2024",
    website: "",
    favoriteGenres: ["Ficção Científica", "Drama", "Romance"],
  })

  const stats = {
    worksPublished: 3,
    worksRead: 24,
    followers: 156,
    following: 89,
    totalLikes: 892,
    averageRating: 4.6,
  }

  const recentActivity = [
    { type: "published", title: "Sertão Digital", date: "2 dias atrás" },
    { type: "finished", title: "A Rendeira de Aquiraz", date: "1 semana atrás" },
    { type: "liked", title: "Memórias do Açude", date: "2 semanas atrás" },
    { type: "followed", user: "Maria Santos", date: "3 semanas atrás" },
  ]

  const cities = [
    "Fortaleza",
    "Caucaia",
    "Juazeiro do Norte",
    "Maracanaú",
    "Sobral",
    "Crato",
    "Itapipoca",
    "Maranguape",
    "Iguatu",
    "Quixadá",
  ]

  const genres = [
    "Romance",
    "Drama",
    "Ficção",
    "Crônica",
    "Poesia",
    "Fantasia",
    "Mistério",
    "Aventura",
    "Ficção Científica",
    "Folclore",
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Implementar lógica de salvamento
    console.log("Profile saved:", profileData)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Meu Perfil</h1>
        <p className="text-[#6e6e6e]">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@joaosilva" />
                  <AvatarFallback className="text-2xl">JS</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full w-8 h-8">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="text-xl font-bold text-[#131313] mb-1">{profileData.name}</h3>
              <p className="text-[#6e6e6e] text-sm mb-2">{profileData.email}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#6e6e6e] mb-4">
                <MapPin className="w-4 h-4" />
                <span>{profileData.city}</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>Desde {profileData.joinDate}</span>
              </div>
              <p className="text-sm text-[#6e6e6e] leading-relaxed">{profileData.bio}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#131313]">{stats.worksPublished}</div>
                <div className="text-sm text-[#6e6e6e]">Obras</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#131313]">{stats.worksRead}</div>
                <div className="text-sm text-[#6e6e6e]">Lidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#131313]">{stats.followers}</div>
                <div className="text-sm text-[#6e6e6e]">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#131313]">{stats.following}</div>
                <div className="text-sm text-[#6e6e6e]">Seguindo</div>
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="mb-6">
              <h4 className="font-semibold text-[#131313] mb-3">Gêneros Favoritos</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.favoriteGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={() => setIsEditing(true)} className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 mt-6">
            <h4 className="font-semibold text-[#131313] mb-4">Atividade Recente</h4>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#009c3b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.type === "published" && <BookOpen className="w-4 h-4 text-[#009c3b]" />}
                    {activity.type === "finished" && <BookOpen className="w-4 h-4 text-[#009c3b]" />}
                    {activity.type === "liked" && <Heart className="w-4 h-4 text-[#009c3b]" />}
                    {activity.type === "followed" && <Users className="w-4 h-4 text-[#009c3b]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#131313]">
                      {activity.type === "published" && `Publicou "${activity.title}"`}
                      {activity.type === "finished" && `Terminou de ler "${activity.title}"`}
                      {activity.type === "liked" && `Curtiu "${activity.title}"`}
                      {activity.type === "followed" && `Começou a seguir ${activity.user}`}
                    </p>
                    <p className="text-xs text-[#6e6e6e]">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Navigation Tabs */}
          <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              onClick={() => setActiveTab("profile")}
              className={activeTab === "profile" ? "bg-white shadow-sm" : ""}
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              onClick={() => setActiveTab("settings")}
              className={activeTab === "settings" ? "bg-white shadow-sm" : ""}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant={activeTab === "privacy" ? "default" : "ghost"}
              onClick={() => setActiveTab("privacy")}
              className={activeTab === "privacy" ? "bg-white shadow-sm" : ""}
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacidade
            </Button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#131313]">Informações Pessoais</h3>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-[#131313]">
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-[#131313]">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium text-[#131313]">
                      Biografia
                    </Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="mt-1 resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-[#131313]">
                        Cidade
                      </Label>
                      <Select
                        value={profileData.city}
                        onValueChange={(value) => setProfileData({ ...profileData, city: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-sm font-medium text-[#131313]">
                        Website (opcional)
                      </Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        placeholder="https://..."
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-[#131313] mb-3 block">
                      Gêneros Favoritos (máximo 5)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {genres.map((genre) => (
                        <Badge
                          key={genre}
                          variant={profileData.favoriteGenres.includes(genre) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            profileData.favoriteGenres.includes(genre)
                              ? "bg-[#009c3b] hover:bg-[#009c3b]/90"
                              : "hover:border-[#009c3b]"
                          }`}
                          onClick={() => {
                            const currentGenres = profileData.favoriteGenres
                            if (currentGenres.includes(genre)) {
                              setProfileData({
                                ...profileData,
                                favoriteGenres: currentGenres.filter((g) => g !== genre),
                              })
                            } else if (currentGenres.length < 5) {
                              setProfileData({
                                ...profileData,
                                favoriteGenres: [...currentGenres, genre],
                              })
                            }
                          }}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleSave} className="bg-[#009c3b] hover:bg-[#009c3b]/90">
                      Salvar Alterações
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">Nome Completo</Label>
                      <p className="text-[#131313] mt-1">{profileData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">E-mail</Label>
                      <p className="text-[#131313] mt-1">{profileData.email}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-[#6e6e6e]">Biografia</Label>
                    <p className="text-[#131313] mt-1 leading-relaxed">{profileData.bio}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">Cidade</Label>
                      <p className="text-[#131313] mt-1">{profileData.city}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">Membro desde</Label>
                      <p className="text-[#131313] mt-1">{profileData.joinDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#131313] mb-6">Notificações</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Novas obras de autores seguidos</h4>
                      <p className="text-sm text-[#6e6e6e]">
                        Receba notificações quando autores que você segue publicarem
                      </p>
                    </div>
                    <Button variant="outline">Ativado</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Comentários nas suas obras</h4>
                      <p className="text-sm text-[#6e6e6e]">Seja notificado quando alguém comentar suas obras</p>
                    </div>
                    <Button variant="outline">Ativado</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Newsletter semanal</h4>
                      <p className="text-sm text-[#6e6e6e]">Receba um resumo semanal das melhores obras</p>
                    </div>
                    <Button variant="outline">Desativado</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#131313] mb-6">Preferências de Leitura</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-[#131313]">Tamanho da fonte padrão</Label>
                    <Select defaultValue="16">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14">Pequena (14px)</SelectItem>
                        <SelectItem value="16">Média (16px)</SelectItem>
                        <SelectItem value="18">Grande (18px)</SelectItem>
                        <SelectItem value="20">Extra Grande (20px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-[#131313]">Tema de leitura</Label>
                    <Select defaultValue="light">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="sepia">Sépia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#131313] mb-6">Configurações de Privacidade</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Perfil público</h4>
                      <p className="text-sm text-[#6e6e6e]">Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <Button variant="outline">Público</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Mostrar estatísticas de leitura</h4>
                      <p className="text-sm text-[#6e6e6e]">Exibir quantas obras você leu e suas avaliações</p>
                    </div>
                    <Button variant="outline">Visível</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Permitir mensagens diretas</h4>
                      <p className="text-sm text-[#6e6e6e]">Outros usuários podem enviar mensagens para você</p>
                    </div>
                    <Button variant="outline">Permitido</Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-[#131313] mb-6">Dados da Conta</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Baixar meus dados
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Excluir conta
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

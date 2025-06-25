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
import { useAuth } from "@/hooks/useAuth"

export function InterfacePerfil() {
  const { usuario } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("perfil")
  const [estaEditando, setEstaEditando] = useState(false)

  const [dadosPerfil, setDadosPerfil] = useState({
    nome: usuario?.nome || "",
    email: usuario?.email || "",
    biografia:
      "Apaixonado por literatura cearense e histórias que conectam tradição e modernidade. Leitor voraz e escritor nas horas vagas.",
    cidade: "Fortaleza",
    dataIngresso: "Janeiro 2024",
    website: "",
    generosPreferidos: ["Ficção Científica", "Drama", "Romance"],
  })

  const estatisticas = {
    obrasPublicadas: 3,
    obrasLidas: 24,
    seguidores: 156,
    seguindo: 89,
    totalCurtidas: 892,
    avaliacaoMedia: 4.6,
  }

  const atividadeRecente = [
    { tipo: "publicou", titulo: "Sertão Digital", data: "2 dias atrás" },
    { tipo: "terminou", titulo: "A Rendeira de Aquiraz", data: "1 semana atrás" },
    { tipo: "curtiu", titulo: "Memórias do Açude", data: "2 semanas atrás" },
    { tipo: "seguiu", usuario: "Maria Santos", data: "3 semanas atrás" },
  ]

  const cidades = [
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

  const generos = [
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

  const handleSalvar = () => {
    setEstaEditando(false)
    // Implementar lógica de salvamento
    console.log("Perfil salvo:", dadosPerfil)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Meu Perfil</h1>
        <p className="text-[#6e6e6e]">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Card do Perfil */}
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
              <h3 className="text-xl font-bold text-[#131313] mb-1">{dadosPerfil.nome}</h3>
              <p className="text-[#6e6e6e] text-sm mb-2">{dadosPerfil.email}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#6e6e6e] mb-4">
                <MapPin className="w-4 h-4" />
                <span>{dadosPerfil.cidade}</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>Desde {dadosPerfil.dataIngresso}</span>
              </div>
              <p className="text-sm text-[#6e6e6e] leading-relaxed">{dadosPerfil.biografia}</p>
            </div>

            {/* Estatísticas */}
            {/* Remover */}

            {/* Gêneros Favoritos */}
            <div className="mb-6">
              <h4 className="font-semibold text-[#131313] mb-3">Gêneros Favoritos</h4>
              <div className="flex flex-wrap gap-2">
                {dadosPerfil.generosPreferidos.map((genero) => (
                  <Badge key={genero} variant="secondary" className="text-xs">
                    {genero}
                  </Badge>
                ))}
              </div>
            </div>

            <Button onClick={() => setEstaEditando(true)} className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </Card>

          {/* Atividade Recente */}
          <Card className="p-6 mt-6">
            <h4 className="font-semibold text-[#131313] mb-4">Atividade Recente</h4>
            <div className="space-y-3">
              {atividadeRecente.map((atividade, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#009c3b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {atividade.tipo === "publicou" && <BookOpen className="w-4 h-4 text-[#009c3b]" />}
                    {atividade.tipo === "terminou" && <BookOpen className="w-4 h-4 text-[#009c3b]" />}
                    {atividade.tipo === "curtiu" && <Heart className="w-4 h-4 text-[#009c3b]" />}
                    {atividade.tipo === "seguiu" && <Users className="w-4 h-4 text-[#009c3b]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#131313]">
                      {atividade.tipo === "publicou" && `Publicou "${atividade.titulo}"`}
                      {atividade.tipo === "terminou" && `Terminou de ler "${atividade.titulo}"`}
                      {atividade.tipo === "curtiu" && `Curtiu "${atividade.titulo}"`}
                      {atividade.tipo === "seguiu" && `Começou a seguir ${atividade.usuario}`}
                    </p>
                    <p className="text-xs text-[#6e6e6e]">{atividade.data}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-2">
          {/* Abas de Navegação */}
          <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
            <Button
              variant={abaAtiva === "perfil" ? "default" : "ghost"}
              onClick={() => setAbaAtiva("perfil")}
              className={abaAtiva === "perfil" ? "bg-white shadow-sm" : ""}
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant={abaAtiva === "configuracoes" ? "default" : "ghost"}
              onClick={() => setAbaAtiva("configuracoes")}
              className={abaAtiva === "configuracoes" ? "bg-white shadow-sm" : ""}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant={abaAtiva === "privacidade" ? "default" : "ghost"}
              onClick={() => setAbaAtiva("privacidade")}
              className={abaAtiva === "privacidade" ? "bg-white shadow-sm" : ""}
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacidade
            </Button>
          </div>

          {/* Aba Perfil */}
          {abaAtiva === "perfil" && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#131313]">Informações Pessoais</h3>
                {!estaEditando && (
                  <Button variant="outline" onClick={() => setEstaEditando(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                )}
              </div>

              {estaEditando ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nome" className="text-sm font-medium text-[#131313]">
                        Nome Completo
                      </Label>
                      <Input
                        id="nome"
                        value={dadosPerfil.nome}
                        onChange={(e) => setDadosPerfil({ ...dadosPerfil, nome: e.target.value })}
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
                        value={dadosPerfil.email}
                        onChange={(e) => setDadosPerfil({ ...dadosPerfil, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="biografia" className="text-sm font-medium text-[#131313]">
                      Biografia
                    </Label>
                    <Textarea
                      id="biografia"
                      value={dadosPerfil.biografia}
                      onChange={(e) => setDadosPerfil({ ...dadosPerfil, biografia: e.target.value })}
                      className="mt-1 resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="cidade" className="text-sm font-medium text-[#131313]">
                        Cidade
                      </Label>
                      <Select
                        value={dadosPerfil.cidade}
                        onValueChange={(value) => setDadosPerfil({ ...dadosPerfil, cidade: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cidades.map((cidade) => (
                            <SelectItem key={cidade} value={cidade}>
                              {cidade}
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
                        value={dadosPerfil.website}
                        onChange={(e) => setDadosPerfil({ ...dadosPerfil, website: e.target.value })}
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
                      {generos.map((genero) => (
                        <Badge
                          key={genero}
                          variant={dadosPerfil.generosPreferidos.includes(genero) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            dadosPerfil.generosPreferidos.includes(genero)
                              ? "bg-[#009c3b] hover:bg-[#009c3b]/90"
                              : "hover:border-[#009c3b]"
                          }`}
                          onClick={() => {
                            const generosAtuais = dadosPerfil.generosPreferidos
                            if (generosAtuais.includes(genero)) {
                              setDadosPerfil({
                                ...dadosPerfil,
                                generosPreferidos: generosAtuais.filter((g) => g !== genero),
                              })
                            } else if (generosAtuais.length < 5) {
                              setDadosPerfil({
                                ...dadosPerfil,
                                generosPreferidos: [...generosAtuais, genero],
                              })
                            }
                          }}
                        >
                          {genero}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleSalvar} className="bg-[#009c3b] hover:bg-[#009c3b]/90">
                      Salvar Alterações
                    </Button>
                    <Button variant="outline" onClick={() => setEstaEditando(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">Nome Completo</Label>
                      <p className="text-[#131313] mt-1">{dadosPerfil.nome}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">E-mail</Label>
                      <p className="text-[#131313] mt-1">{dadosPerfil.email}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-[#6e6e6e]">Biografia</Label>
                    <p className="text-[#131313] mt-1 leading-relaxed">{dadosPerfil.biografia}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">Cidade</Label>
                      <p className="text-[#131313] mt-1">{dadosPerfil.cidade}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-[#6e6e6e]">Membro desde</Label>
                      <p className="text-[#131313] mt-1">{dadosPerfil.dataIngresso}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Aba Configurações */}
          {abaAtiva === "configuracoes" && (
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
                    <Select defaultValue="claro">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claro">Claro</SelectItem>
                        <SelectItem value="escuro">Escuro</SelectItem>
                        <SelectItem value="sepia">Sépia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Aba Privacidade */}
          {abaAtiva === "privacidade" && (
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

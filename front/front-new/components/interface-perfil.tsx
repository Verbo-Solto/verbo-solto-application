"use client"

import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
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
import axios from "axios"

export function InterfacePerfil() {
  const { usuario } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("perfil")
  const [estaEditando, setEstaEditando] = useState(false)
  const [imagemPreview, setImagemPreview] = useState<string | null>(null)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)

  const [dadosPerfil, setDadosPerfil] = useState({
    nome: "",
    email: "",
    biografia: "",
    cidade: "",
    dataIngresso: "",
    website: "",
    generosPreferidos: ["Ficção Científica", "Drama", "Romance"],
    imagem: "",
  })

  // Carregar perfil do backend ao abrir a tela
  useEffect(() => {
    const fetchPerfil = async () => {
      setErro(null)
      const token = localStorage.getItem("access")
      if (!token) {
        setErro("Você precisa estar logado para acessar seu perfil.")
        return
      }
      try {
        const response = await axios.get("http://localhost:8000/api/profiles/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const perfil = response.data
        setDadosPerfil({
          nome: perfil.user.first_name || perfil.user.username,
          email: perfil.user.email,
          biografia: perfil.bio || "",
          cidade: perfil.cidade || "",
          dataIngresso: perfil.user.date_joined
            ? new Date(perfil.user.date_joined).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
            : "",
          website: "",
          generosPreferidos: perfil.generos_preferidos || ["Ficção Científica", "Drama", "Romance"],
          imagem: perfil.imagem || "",
        })
      } catch (err) {
        setErro("Erro ao carregar perfil. Verifique sua autenticação.")
      }
    }
    fetchPerfil()
  }, [])

  // Salvar edição do perfil (nome, email, bio, cidade, generos)
  const handleSalvar = async () => {
    setSalvando(true)
    setErro(null)
    setSucesso(null)
    const token = localStorage.getItem("access")
    if (!token) {
      setErro("Você precisa estar logado para editar seu perfil.")
      setSalvando(false)
      return
    }
    try {
      const payload: any = {
        bio: dadosPerfil.biografia,
        cidade: dadosPerfil.cidade,
        user: {
          first_name: dadosPerfil.nome,
          email: dadosPerfil.email,
        },
        // Se quiser salvar generos no backend, inclua aqui:
        // generos_preferidos: dadosPerfil.generosPreferidos,
      }
      await axios.patch("http://localhost:8000/api/profiles/me/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSucesso("Perfil atualizado com sucesso!")
      setEstaEditando(false)
    } catch (err) {
      setErro("Erro ao salvar perfil.")
    } finally {
      setSalvando(false)
    }
  }

  // Upload da imagem (base64)
  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImg(true)
    setErro(null)
    setSucesso(null)
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1]
      setImagemPreview("data:image/png;base64," + base64)
      const token = localStorage.getItem("access")
      if (!token) {
        setUploadingImg(false)
        return
      }
      try {
        await axios.patch(
          "http://localhost:8000/api/profiles/me/",
          { imagem_base64: base64 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setDadosPerfil((prev) => ({
          ...prev,
          imagem: base64,
        }))
        setSucesso("Imagem atualizada com sucesso!")
      } catch (err) {
        setErro("Erro ao atualizar imagem.")
      }
      setUploadingImg(false)
    }
    reader.readAsDataURL(file)
  }

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

  // Mock de atividades recentes (substitua por fetch real se necessário)
  const atividadeRecente = [
    {
      tipo: "publicou",
      titulo: "O Sol e a Lua",
      usuario: "",
      data: "há 2 dias",
    },
    {
      tipo: "terminou",
      titulo: "A Jornada do Herói",
      usuario: "",
      data: "há 5 dias",
    },
    {
      tipo: "curtiu",
      titulo: "Versos Urbanos",
      usuario: "",
      data: "há 1 semana",
    },
    {
      tipo: "seguiu",
      titulo: "",
      usuario: "Maria Silva",
      data: "há 2 semanas",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Meu Perfil</h1>
        <p className="text-[#6e6e6e]">Gerencie suas informações pessoais e preferências</p>
      </div>
      {erro && <div className="text-center text-red-600 mb-4">{erro}</div>}
      {sucesso && <div className="text-center text-green-600 mb-4">{sucesso}</div>}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Card do Perfil */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage
                    src={
                      imagemPreview
                        ? imagemPreview
                        : dadosPerfil.imagem
                        ? `data:image/png;base64,${dadosPerfil.imagem}`
                        : "/placeholder.svg?height=96&width=96"
                    }
                    alt={dadosPerfil.nome}
                  />
                  <AvatarFallback className="text-2xl">
                    {dadosPerfil.nome
                      ? dadosPerfil.nome.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                      : "US"}
                  </AvatarFallback>
                </Avatar>
                {/* Botão de upload de imagem */}
                <label className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-white border border-gray-300 flex items-center justify-center cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImagemChange}
                    disabled={uploadingImg}
                  />
                </label>
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
              {atividadeRecente.map((atividade: { tipo: string; titulo: any; usuario: any; data: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, index: Key | null | undefined) => (
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
            {/* Corrige o estilo dos botões de abas para todas as telas */}
            <Button
              variant={abaAtiva === "perfil" ? "default" : "ghost"}
              onClick={() => setAbaAtiva("perfil")}
              className={
                abaAtiva === "perfil"
                  ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                  : "hover:bg-[#009c3b]/10 border border-transparent"
              }
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant={abaAtiva === "configuracoes" ? "default" : "ghost"}
              onClick={() => setAbaAtiva("configuracoes")}
              className={
                abaAtiva === "configuracoes"
                  ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                  : "hover:bg-[#009c3b]/10 border border-transparent"
              }
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </Button>
            <Button
              variant={abaAtiva === "privacidade" ? "default" : "ghost"}
              onClick={() => setAbaAtiva("privacidade")}
              className={
                abaAtiva === "privacidade"
                  ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                  : "hover:bg-[#009c3b]/10 border border-transparent"
              }
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
                    <Button onClick={handleSalvar} className="bg-[#009c3b] hover:bg-[#009c3b]/90" disabled={salvando}>
                      {salvando ? "Salvando..." : "Salvar Alterações"}
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

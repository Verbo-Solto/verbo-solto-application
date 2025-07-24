"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
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
import Link from "next/link"

interface PerfilAPI {
  user: {
    username: string
    email: string
    first_name: string
    date_joined?: string
  }
  bio: string
  cidade: string
  imagem?: string
  seguidores: number
  seguindo: number
}

export function InterfacePerfil() {
  const { usuario } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("perfil")
  const [estaEditando, setEstaEditando] = useState(false)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState<string | null>(null)
  // Feedback visual
  const [feedback, setFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dadosPerfil, setDadosPerfil] = useState({
    nome: "",
    email: "",
    biografia: "",
    cidade: "",
    dataIngresso: "",
    website: "",
    imagem: "",
    seguidores: 0,
    seguindo: 0,
  })

  const fetchPerfil = async () => {
    setCarregando(true)
    setErro(null)
    const token = localStorage.getItem("access")
    if (!token) {
      setErro("Você precisa estar logado para acessar seu perfil.")
      setCarregando(false)
      return
    }
    try {
      const response = await axios.get<PerfilAPI>("http://localhost:8000/api/profile/me/", {
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
        imagem: perfil.imagem || "",
        seguidores: perfil.seguidores || 0,
        seguindo: perfil.seguindo || 0,
      })
    } catch (err) {
      setErro("Erro ao carregar perfil. Verifique sua autenticação.")
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    fetchPerfil()
  }, [])

  const estatisticas = {
    obrasPublicadas: 3,
    obrasLidas: 24,
    seguidores: 156,
    seguindo: 89,
    totalCurtidas: 892,
    avaliacaoMedia: 4.6,
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

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = (ev.target?.result as string).split(",")[1];
        setDadosPerfil((prev) => ({ ...prev, imagem: base64 }));
        setFeedback("Foto atualizada! Clique em salvar para confirmar.");
        setTimeout(() => setFeedback(null), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoverFoto = () => {
    setDadosPerfil((prev) => ({ ...prev, imagem: "" }));
    setFeedback("Foto removida! Clique em salvar para confirmar.");
    setTimeout(() => setFeedback(null), 2000);
  };

  const handleSalvar = async () => {
    setSalvando(true)
    setFeedback(null)
    const token = localStorage.getItem("access")
    if (!token) {
      setFeedback("Erro ao salvar perfil.");
      setSalvando(false)
      setTimeout(() => setFeedback(null), 3000);
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
      };
      if (dadosPerfil.imagem && dadosPerfil.imagem.length > 100) {
        payload.imagem_base64 = dadosPerfil.imagem;
      } else if (dadosPerfil.imagem === "") {
        payload.imagem_base64 = "";
      }
      await axios.patch("http://localhost:8000/api/profile/me/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      await fetchPerfil()
      setFeedback("Perfil atualizado!");
      setEstaEditando(false)
    } catch (err) {
      setFeedback("Erro ao salvar perfil.");
    } finally {
      setSalvando(false)
      setTimeout(() => setFeedback(null), 3000);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Meu Perfil</h1>
        <p className="text-[#6e6e6e]">Gerencie suas informações pessoais e preferências</p>
      </div>
      {/* Remover mensagens de validação */}
      {carregando ? (
        <div className="text-center text-gray-600">Carregando perfil...</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Card do Perfil */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="relative flex flex-col items-center mb-6">
                  <Avatar className="w-32 h-32 mx-auto mb-2 shadow-lg border-4 border-[#e6f4ec]">
                    <AvatarImage src={dadosPerfil.imagem ? (dadosPerfil.imagem.length > 100 ? `data:image/png;base64,${dadosPerfil.imagem}` : dadosPerfil.imagem) : "/placeholder-user.jpg"} alt={dadosPerfil.nome} />
                    <AvatarFallback className="text-3xl">
                      {dadosPerfil.nome
                        ? dadosPerfil.nome.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
                        : "US"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Camera className="w-4 h-4 mr-1" /> Trocar foto
                    </Button>
                    {dadosPerfil.imagem && (
                      <Button variant="ghost" size="sm" onClick={handleRemoverFoto} title="Remover foto">
                        ✕ Remover
                      </Button>
                    )}
                  </div>
                  <input ref={fileInputRef} id="foto-perfil-upload" type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                </div>
                <h3 className="text-xl font-bold text-[#131313] mb-1">{dadosPerfil.nome || "Nome não informado"}</h3>
                <p className="text-[#6e6e6e] text-sm mb-2">{dadosPerfil.email || "E-mail não informado"}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-[#6e6e6e] mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{dadosPerfil.cidade || "Cidade não informada"}</span>
                  <span>•</span>
                  <Calendar className="w-4 h-4" />
                  <span>Desde {dadosPerfil.dataIngresso || "data desconhecida"}</span>
                </div>
                <p className="text-sm text-[#6e6e6e] leading-relaxed">{dadosPerfil.biografia || "Sem biografia."}</p>
              </div>

              <div className="flex justify-around text-center mb-6 border-t border-b py-4">
                <div>
                  <p className="font-bold text-lg">{dadosPerfil.seguidores}</p>
                  <Link href={`/perfil/${usuario?.email || "usuario"}/seguidores`} className="text-sm text-gray-600 hover:underline">
                    Seguidores
                  </Link>
                </div>
                <div>
                  <p className="font-bold text-lg">{dadosPerfil.seguindo}</p>
                  <Link href={`/perfil/${usuario?.email || "usuario"}/seguindo`} className="text-sm text-gray-600 hover:underline">
                    Seguindo
                  </Link>
                </div>
              </div>

              <Button onClick={() => setEstaEditando(true)} className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90 mt-2">
                <Edit className="w-4 h-4 mr-2" />
                Editar Perfil
              </Button>
            </Card>

          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {/* Abas de Navegação - apenas Perfil */}
            <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
              <Button
                variant={abaAtiva === "perfil" ? "default" : "ghost"}
                onClick={() => setAbaAtiva("perfil")}
                className={abaAtiva === "perfil" ? "bg-[#009c3b] text-white" : ""}
              >
                <User className="w-4 h-4 mr-2" />
                Perfil
              </Button>
            </div>

            {/* Aba Perfil */}
            {abaAtiva === "perfil" && (
              <Card className="p-6 max-w-2xl mx-auto shadow-xl rounded-2xl border border-[#e6f4ec] bg-white">
                {feedback && (
                  <div className={`mb-4 text-center font-medium ${feedback.includes('Erro') ? 'text-red-600' : 'text-green-600'}`}>{feedback}</div>
                )}
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

                    <div className="flex gap-4">
                      <Button onClick={handleSalvar} className="bg-[#009c3b] hover:bg-[#009c3b]/90">
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
          </div>
        </div>
      )}
    </div>
  )
}
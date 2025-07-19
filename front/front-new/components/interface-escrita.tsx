"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EditorTiptap } from "./editor-tiptap"
import { Save, Eye, Send, Plus, X, BookOpen, FileText, Clock, Tag, MapPin, User } from "lucide-react"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function InterfaceEscrita() {
  const [titulo, setTitulo] = useState("")
  const [resumo, setResumo] = useState("")
  const [genero, setGenero] = useState("")
  const [cidade, setCidade] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [novaTag, setNovaTag] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [salvandoAutomatico, setSalvandoAutomatico] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)
  const [publicando, setPublicando] = useState(false)
  const [colecoes, setColecoes] = useState<{ id: number; nome: string }[]>([])
  const [colecaoSelecionada, setColecaoSelecionada] = useState<string>("0")
  const [novaColecao, setNovaColecao] = useState("")
  const [aba, setAba] = useState<"escrever" | "colecoes">("escrever")
  const [capa, setCapa] = useState<File | null>(null)
  const [statusObra, setStatusObra] = useState<"publicada" | "rascunho">("publicada")
  const router = useRouter()
  const searchParams = useSearchParams()
  const obraId = searchParams.get("editar") || searchParams.get("rascunho") || null

  const generos = [
    "Romance",
    "Drama",
    "Ficção Científica",
    "Fantasia",
    "Mistério",
    "Thriller",
    "Aventura",
    "Biografia",
    "História",
    "Poesia",
    "Crônica",
    "Conto",
    "Folclore",
    "Memórias",
  ]

  const cidadesCeara = [
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
    "Canindé",
    "Aquiraz",
    "Pacatuba",
    "Crateús",
    "Aracati",
  ]

  // Buscar coleções do usuário para seleção
  useEffect(() => {
    const token = localStorage.getItem("access")
    if (!token) return
    axios
      .get("http://localhost:8000/api/colecoes/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setColecoes(resp.data))
      .catch(() => setColecoes([]))
  }, [])

  const [paginas, setPaginas] = useState<string[]>([""])
  const [paginaAtual, setPaginaAtual] = useState(0)
  const [erroPagina, setErroPagina] = useState<string | null>(null)

 
  useEffect(() => {
    if (conteudo.startsWith("<p>")) {
      setPaginas([conteudo])
      setPaginaAtual(0)
    } else {
      const palavras = conteudo.split(/\s+/).filter(Boolean)
      const novasPaginas = []
      for (let i = 0; i < palavras.length; i += 300) {
        novasPaginas.push(palavras.slice(i, i + 300).join(" "))
      }
      if (novasPaginas.length === 0) novasPaginas.push("")
      setPaginas(novasPaginas)
      if (paginaAtual >= novasPaginas.length) setPaginaAtual(novasPaginas.length - 1)
    }
  }, [conteudo])

  const handlePaginaChange = (valor: string, idx: number) => {
    setErroPagina(null)
    const palavras = valor.split(/\s+/).filter(Boolean)
    if (palavras.length > 300) {
      setErroPagina("Cada página pode ter no máximo 300 palavras.")
      return
    }
    if (valor.length > 3000) {
      setErroPagina("Cada página pode ter no máximo 3.000 caracteres.")
      return
    }
    const novasPaginas = [...paginas]
    novasPaginas[idx] = valor
    setPaginas(novasPaginas)
    setConteudo(novasPaginas.join(" ").replace(/\s+/g, " ").trim())
  }

  // Adiciona uma nova página vazia
  function adicionarPagina() {
    if (paginas.length >= 10) return
    setPaginas([...paginas, ""])
    setPaginaAtual(paginas.length)
  }

  // Upload de capa (salva como base64 para enviar ao backend)
  const [capaBase64, setCapaBase64] = useState<string | null>(null)
  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCapa(e.target.files[0])
      const reader = new FileReader()
      reader.onload = (ev) => {
        const base64 = (ev.target?.result as string).split(",")[1]
        setCapaBase64(base64)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Carregar dados da obra para edição
  useEffect(() => {
    if (!obraId) return
    setErro(null)
    setSalvandoAutomatico(true)
    const token = localStorage.getItem("access")
    if (!token) {
      setErro("Você precisa estar logado para editar uma obra.")
      setSalvandoAutomatico(false)
      return
    }
    axios
      .get(`http://localhost:8000/api/obras/${obraId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        const obra = resp.data
        setTitulo(obra.titulo || "")
        setResumo(obra.resumo || "")
        setGenero(obra.genero || "")
        setCidade(obra.cidade || "")
        setTags(Array.isArray(obra.tags) ? obra.tags.map((t: any) => (typeof t === "string" ? t : t.nome)) : [])
        setConteudo(obra.conteudo || "")
        setStatusObra(obra.status || "rascunho")
        setColecaoSelecionada(obra.colecao ? String(obra.colecao) : "0")
        // Capa preview
        if (obra.capa) {
          setCapaBase64(obra.capa)
        }
      })
      .catch(() => setErro("Erro ao carregar obra para edição."))
      .finally(() => setSalvandoAutomatico(false))
  }, [obraId])

  // Ao carregar o conteúdo para edição, atualiza as páginas
  useEffect(() => {
    if (obraId && conteudo) {
      // Divide o texto em páginas de até 300 palavras cada
      const palavras = conteudo.split(/\s+/).filter(Boolean)
      const novasPaginas = []
      for (let i = 0; i < palavras.length; i += 300) {
        novasPaginas.push(palavras.slice(i, i + 300).join(" "))
      }
      if (novasPaginas.length === 0) novasPaginas.push("")
      setPaginas(novasPaginas)
      setPaginaAtual(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obraId, conteudo])

  // Salvar rascunho (criação ou edição)
  const salvarRascunho = async () => {
    setErro(null)
    setSucesso(null)
    setPublicando(true)
    try {
      const token = localStorage.getItem("access")
      if (!token) {
        setErro("Você precisa estar logado para salvar.")
        setPublicando(false)
        return
      }
      const payload: any = {
        titulo,
        genero,
        conteudo: paginas.join(" ").replace(/\s+/g, " ").trim(),
        resumo,
        cidade,
        status: "rascunho",
        tags,
      }
      if (colecaoSelecionada !== "0") payload.colecao = colecaoSelecionada
      if (capaBase64) payload.capa_base64 = capaBase64

      if (obraId) {
        // Edição de obra existente
        await axios.patch(`http://localhost:8000/api/obras/${obraId}/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSucesso("Rascunho atualizado com sucesso!")
      } else {
        // Criação de nova obra
        await axios.post("http://localhost:8000/api/obras/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSucesso("Rascunho salvo com sucesso!")
      }
    } catch (err: any) {
      setErro("Erro ao salvar rascunho.")
    }
    setPublicando(false)
  }

  const visualizarPrevia = () => {
    // Implementar preview
    console.log("Visualizar prévia")
  }

  // Corrija o payload para enviar colecao como inteiro ou null
  const publicarObra = async () => {
    setErro(null)
    setSucesso(null)
    setPublicando(true)

    // Validação frontend (regras de negócio)
    if (!titulo.trim() || !genero.trim() || !conteudo.trim() || !resumo.trim()) {
      setErro("Preencha todos os campos obrigatórios (título, gênero, conteúdo e resumo).")
      setPublicando(false)
      return
    }
    const palavras = conteudo.split(/\s+/).filter(Boolean)
    if (palavras.length > 2000) {
      setErro("O texto excede o limite de 2000 palavras.")
      setPublicando(false)
      return
    }
    if (conteudo.length < 1500 || conteudo.length > 3000) {
      setErro("O texto deve ter entre 1.500 e 3.000 caracteres (com espaços).")
      setPublicando(false)
      return
    }
    if (resumo.length < 150 || resumo.length > 300) {
      setErro("O resumo deve ter entre 150 e 300 caracteres.")
      setPublicando(false)
      return
    }
    if (tags.length > 5) {
      setErro("No máximo 5 tags por obra.")
      setPublicando(false)
      return
    }

    try {
      const token = localStorage.getItem("access")
      if (!token) {
        setErro("Você precisa estar logado para publicar.")
        setPublicando(false)
        return
      }
      const payload: any = {
        titulo,
        genero,
        conteudo: paginas.join(" ").replace(/\s+/g, " ").trim(),
        resumo,
        cidade,
        status: "publicada",
        tags,
      }
      if (colecaoSelecionada !== "0") payload.colecao = colecaoSelecionada
      if (capaBase64) payload.capa_base64 = capaBase64

      if (obraId) {
        // Edição de obra existente
        const resp = await axios.patch(`http://localhost:8000/api/obras/${obraId}/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSucesso("Obra atualizada com sucesso!")
        router.push(`/obra/${resp.data.id || obraId}`)
      } else {
        // Criação de nova obra
        const resp = await axios.post("http://localhost:8000/api/obras/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setSucesso("Obra publicada com sucesso!")
        router.push(`/obra/${resp.data.id}`)
      }
    } catch (err: any) {
      if (err.response?.data?.detail) setErro(err.response.data.detail)
      else if (err.response?.data?.non_field_errors) setErro(err.response.data.non_field_errors.join(" "))
      else if (typeof err.response?.data === "object") {
        const firstError = Object.values(err.response.data)[0]
        setErro(Array.isArray(firstError) ? firstError[0] : String(firstError))
      }
      else setErro("Erro ao publicar obra.")
    }
    setPublicando(false)
  }

  // Criar nova coleção
  const criarColecao = async () => {
    if (!novaColecao.trim()) return
    const token = localStorage.getItem("access")
    if (!token) return
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/colecoes/",
        { nome: novaColecao, descricao: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setColecoes([...colecoes, resp.data])
      setColecaoSelecionada(resp.data.id)
      setNovaColecao("")
    } catch {}
  }

  // Prévia modal
  const [mostrarPrevia, setMostrarPrevia] = useState(false)

  function adicionarTag(): void {
    if (!novaTag.trim()) return
    if (tags.includes(novaTag.trim())) return
    if (tags.length >= 5) return
    setTags([...tags, novaTag.trim()])
    setNovaTag("")
  }

  function removerTag(tagRemover: string): void {
    setTags(tags.filter((tag) => tag !== tagRemover))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] to-[#f8f9fa] py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Abas principais */}
        <Tabs value={aba} onValueChange={(value) => setAba(value as "escrever" | "colecoes")}>
          <TabsList className="mb-8">
            <TabsTrigger value="escrever">Escrever Obra</TabsTrigger>
            <TabsTrigger value="colecoes">Minhas Coleções</TabsTrigger>
          </TabsList>

          {/* Aba de Escrita */}
          <TabsContent value="escrever">
            {/* Header da Escrita */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#009c3b] to-[#00b341] rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-['Montserrat',Helvetica] font-bold text-[#131313] text-2xl">Nova Obra</h1>
                  <p className="font-['Montserrat',Helvetica] text-[#6e6e6e] text-sm">
                    Compartilhe sua história com o mundo
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-[#6e6e6e]">
                  <Clock className="w-4 h-4" />
                  <span>{salvandoAutomatico ? "Salvando..." : "Salvo automaticamente"}</span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setMostrarPrevia(true)}
                  className="border-[#e5e7eb] hover:bg-[#f9fafb]"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Prévia
                </Button>
                <Button onClick={salvarRascunho} className="bg-[#6b7280] hover:bg-[#4b5563] text-white" disabled={publicando}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button
                  onClick={publicarObra}
                  className="bg-[#009c3b] hover:bg-[#00b341] text-white"
                  disabled={publicando}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {publicando ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </div>

            {/* Feedback de erro/sucesso no topo */}
            {(erro || sucesso) && (
              <div className="mb-4 flex justify-center">
                {erro && <div className="bg-red-100 text-red-700 px-4 py-2 rounded shadow">{erro}</div>}
                {sucesso && <div className="bg-green-100 text-green-700 px-4 py-2 rounded shadow">{sucesso}</div>}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Área Principal de Escrita */}
              <div className="lg:col-span-2 space-y-6">
                {/* Título */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <Label htmlFor="titulo" className="text-base font-medium text-[#131313] mb-3 block">
                      Título da Obra
                    </Label>
                    <Input
                      id="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Digite o título da sua obra..."
                      className="text-lg font-medium border-[#e5e7eb] focus:border-[#009c3b] focus:ring-[#009c3b]"
                    />
                  </CardContent>
                </Card>

                {/* Editor de Conteúdo paginado */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <Label className="text-base font-medium text-[#131313] mb-3 block">
                      Conteúdo
                    </Label>
                    {/* Se for HTML do tiptap, renderize o editor tiptap */}
                    {paginas.length === 1 && paginas[0].startsWith("<p>") ? (
                      <EditorTiptap
                        content={paginas[0]}
                        onChange={setConteudo}
                        placeholder="Digite o texto da sua obra..."
                      />
                    ) : (
                      <>
                        <div className="flex gap-2 mb-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPaginaAtual(Math.max(0, paginaAtual - 1))}
                            disabled={paginaAtual === 0}
                          >
                            {"← Página anterior"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPaginaAtual(Math.min(paginas.length - 1, paginaAtual + 1))}
                            disabled={paginaAtual === paginas.length - 1}
                          >
                            {"Próxima página →"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={adicionarPagina}
                            disabled={paginas.length >= 10}
                          >
                            + Nova Página
                          </Button>
                          <span className="ml-auto text-xs text-[#6e6e6e]">
                            {paginas[paginaAtual]?.split(/\s+/).filter(Boolean).length || 0}/300 palavras
                          </span>
                        </div>
                        <Textarea
                          value={paginas[paginaAtual]}
                          onChange={e => handlePaginaChange(e.target.value, paginaAtual)}
                          placeholder="Digite o texto desta página... Use Enter para quebrar linhas normalmente."
                          className="min-h-[200px] border-[#e5e7eb] focus:border-[#009c3b] focus:ring-[#009c3b] font-mono whitespace-pre-line"
                          maxLength={3000}
                        />
                        <div className="flex justify-end text-xs text-[#6e6e6e] mt-1">
                          {paginas[paginaAtual]?.length || 0}/3000 caracteres
                        </div>
                        {erroPagina && (
                          <div className="mt-2 text-red-600 text-sm">{erroPagina}</div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Visualização paginada */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <Label className="text-base font-medium text-[#131313] mb-3 block">Prévia Paginada</Label>
                    <div className="border border-[#e5e7eb] rounded-lg p-4 bg-[#fafafa]">
                      {paginas.map((pagina, idx) => (
                        <div key={idx} className="mb-8">
                          <div className="text-xs text-[#009c3b] mb-2">Página {idx + 1}</div>
                          {/* Mostra as quebras de linha reais do texto */}
                          <div className="whitespace-pre-line">{pagina}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar com Metadados */}
              <div className="space-y-6">
                {/* Informações Básicas */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-[#131313] mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#009c3b]" />
                      Informações da Obra
                    </h3>

                    <div className="space-y-4">
                      {/* Gênero */}
                      <div>
                        <Label htmlFor="genero" className="text-sm font-medium text-[#131313] mb-2 block">
                          Gênero
                        </Label>
                        <Select value={genero} onValueChange={setGenero}>
                          <SelectTrigger className="border-[#e5e7eb] focus:border-[#009c3b]">
                            <SelectValue placeholder="Selecione o gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            {generos.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Cidade */}
                      <div>
                        <Label
                          htmlFor="cidade"
                          className="text-sm font-medium text-[#131313] mb-2 block flex items-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Cidade (Ceará)
                        </Label>
                        <Select value={cidade} onValueChange={setCidade}>
                          <SelectTrigger className="border-[#e5e7eb] focus:border-[#009c3b]">
                            <SelectValue placeholder="Selecione a cidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {cidadesCeara.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Resumo */}
                      <div>
                        <Label htmlFor="resumo" className="text-sm font-medium text-[#131313] mb-2 block">
                          Resumo
                        </Label>
                        <Textarea
                          id="resumo"
                          value={resumo}
                          onChange={(e) => setResumo(e.target.value)}
                          placeholder="Escreva um breve resumo da sua obra..."
                          className="min-h-[100px] border-[#e5e7eb] focus:border-[#009c3b] focus:ring-[#009c3b]"
                          maxLength={300}
                        />
                        <p className="text-xs text-[#6e6e6e] mt-1">{resumo.length}/300 caracteres</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-[#131313] mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#009c3b]" />
                      Tags
                    </h3>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={novaTag}
                          onChange={(e) => setNovaTag(e.target.value)}
                          placeholder="Adicionar tag..."
                          className="flex-1 border-[#e5e7eb] focus:border-[#009c3b]"
                          onKeyPress={(e) => e.key === "Enter" && adicionarTag()}
                        />
                        <Button onClick={adicionarTag} size="sm" className="bg-[#009c3b] hover:bg-[#00b341] text-white">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-[#009c3b]/10 text-[#009c3b] hover:bg-[#009c3b]/20"
                            >
                              {tag}
                              <button onClick={() => removerTag(tag)} className="ml-2 hover:text-red-600">
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Seleção de Coleção */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <Label htmlFor="colecao" className="text-sm font-medium text-[#131313] mb-2 block">
                      Coleção (opcional)
                    </Label>
                    <Select
                      value={colecaoSelecionada}
                      onValueChange={(value) => setColecaoSelecionada(value)}
                    >
                      <SelectTrigger className="border-[#e5e7eb] focus:border-[#009c3b]">
                        <SelectValue placeholder="Selecione uma coleção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Sem coleção</SelectItem>
                        {colecoes.map((c) => (
                          <SelectItem key={c.id} value={String(c.id)}>
                            {c.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2 mt-3">
                      <Input
                        value={novaColecao}
                        onChange={e => setNovaColecao(e.target.value)}
                        placeholder="Nova coleção..."
                      />
                      <Button size="sm" onClick={criarColecao} className="bg-[#009c3b] text-white">
                        Criar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upload de capa */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <Label className="text-sm font-medium text-[#131313] mb-2 block">Capa da Obra (opcional)</Label>
                    <Input type="file" accept="image/*" onChange={handleCapaChange} />
                    {capa && <div className="mt-2 text-xs text-[#009c3b]">{capa.name}</div>}
                  </CardContent>
                </Card>

                {/* Estatísticas */}
                <Card className="border-none shadow-sm bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-[#131313] mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#009c3b]" />
                      Estatísticas
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6e6e6e]">Palavras:</span>
                        <span className="font-medium text-[#131313]">
                          {conteudo.split(" ").filter((word) => word.length > 0).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6e6e6e]">Caracteres:</span>
                        <span className="font-medium text-[#131313]">{conteudo.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6e6e6e]">Tempo de leitura:</span>
                        <span className="font-medium text-[#131313]">
                          {Math.ceil(conteudo.split(" ").filter((word) => word.length > 0).length / 200)} min
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Modal de prévia */}
            {mostrarPrevia && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
                  <button
                    className="absolute top-2 right-2 text-[#009c3b] hover:text-red-600"
                    onClick={() => setMostrarPrevia(false)}
                  >
                    Fechar
                  </button>
                  <h2 className="text-xl font-bold mb-4">Prévia da Obra</h2>
                  <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                    {paginas.map((pagina, idx) => (
                      <div key={idx} className="mb-6">
                        <div className="text-xs text-[#009c3b] mb-2">Página {idx + 1}</div>
                        <div className="whitespace-pre-line">{pagina}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Aba de Coleções */}
          <TabsContent value="colecoes">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Minhas Coleções</h2>
              <div className="mb-4 flex gap-2">
                <Input
                  value={novaColecao}
                  onChange={e => setNovaColecao(e.target.value)}
                  placeholder="Nova coleção..."
                />
                <Button size="sm" onClick={criarColecao} className="bg-[#009c3b] text-white">
                  Criar
                </Button>
              </div>
              {colecoes.length === 0 ? (
                <div className="text-[#6e6e6e]">Nenhuma coleção criada ainda.</div>
              ) : (
                <ul className="space-y-2">
                  {colecoes.map((c) => (
                    <li key={c.id} className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#009c3b]" />
                      <span className="font-medium">{c.nome}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
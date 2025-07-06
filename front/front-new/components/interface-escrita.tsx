"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EditorTiptap } from "./editor-tiptap"
import { Save, Eye, Send, Plus, X, BookOpen, FileText, Clock, Tag, MapPin, User } from "lucide-react"

export function InterfaceEscrita() {
  const [titulo, setTitulo] = useState("")
  const [resumo, setResumo] = useState("")
  const [genero, setGenero] = useState("")
  const [cidade, setCidade] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [novaTag, setNovaTag] = useState("")
  const [conteudo, setConteudo] = useState("")
  const [salvandoAutomatico, setSalvandoAutomatico] = useState(false)

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

  const adicionarTag = () => {
    if (novaTag.trim() && !tags.includes(novaTag.trim())) {
      setTags([...tags, novaTag.trim()])
      setNovaTag("")
    }
  }

  const removerTag = (tagParaRemover: string) => {
    setTags(tags.filter((tag) => tag !== tagParaRemover))
  }

  const salvarRascunho = () => {
    setSalvandoAutomatico(true)
    // Simular salvamento
    setTimeout(() => {
      setSalvandoAutomatico(false)
    }, 1000)
  }

  const visualizarPrevia = () => {
    // Implementar preview
    console.log("Visualizar prévia")
  }

  const publicarObra = () => {
    // Implementar publicação
    console.log("Publicar obra")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] to-[#f8f9fa] py-8">
      <div className="max-w-6xl mx-auto px-6">
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
            <Button variant="outline" onClick={visualizarPrevia} className="border-[#e5e7eb] hover:bg-[#f9fafb]">
              <Eye className="w-4 h-4 mr-2" />
              Prévia
            </Button>
            <Button onClick={salvarRascunho} className="bg-[#6b7280] hover:bg-[#4b5563] text-white">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button onClick={publicarObra} className="bg-[#009c3b] hover:bg-[#00b341] text-white">
              <Send className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>

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

            {/* Editor de Conteúdo */}
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <Label className="text-base font-medium text-[#131313] mb-3 block">Conteúdo</Label>
                <div className="min-h-[500px] border border-[#e5e7eb] rounded-lg">
                  <EditorTiptap
                    content={conteudo}
                    onChange={setConteudo}
                    placeholder="Comece a escrever sua história..."
                  />
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
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TiptapEditor } from "@/components/tiptap-editor"
import {
  Save,
  Eye,
  Plus,
  X,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  FileText,
  Settings,
  Lightbulb,
  Zap,
} from "lucide-react"

export function WriteInterface() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    synopsis: "",
    content: "",
    tags: [],
    ageRating: "livre",
    targetWords: 1000,
  })

  const [newTag, setNewTag] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [autoSaveStatus, setAutoSaveStatus] = useState("saved")

  const genres = [
    "Romance",
    "Drama",
    "Ficção",
    "Crônica",
    "Poesia",
    "Fantasia",
    "Mistério",
    "Aventura",
    "Biografia",
    "Ensaio",
    "Teatro",
    "Infantil",
    "Ficção Científica",
    "Terror",
    "Comédia",
    "Folclore",
  ]

  const ageRatings = [
    { value: "livre", label: "Livre" },
    { value: "10", label: "10 anos" },
    { value: "12", label: "12 anos" },
    { value: "14", label: "14 anos" },
    { value: "16", label: "16 anos" },
    { value: "18", label: "18 anos" },
  ]

  // Extract text from HTML content for word counting
  const extractTextFromHTML = (html: string) => {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent || div.innerText || ""
  }

  // Calculate word count and reading time
  useEffect(() => {
    const textContent = extractTextFromHTML(formData.content)
    const words = textContent
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length

    setWordCount(words)
    setCharacterCount(textContent.length)
    setReadingTime(Math.ceil(words / 200)) // 200 words per minute average
  }, [formData.content])

  // Auto-save simulation
  useEffect(() => {
    if (formData.title || formData.content) {
      setAutoSaveStatus("saving")
      const timer = setTimeout(() => {
        setAutoSaveStatus("saved")
        // Simulate saving to localStorage
        localStorage.setItem("draft-work", JSON.stringify(formData))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [formData])

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("draft-work")
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        setFormData(parsed)
      } catch (e) {
        console.error("Error loading draft:", e)
      }
    }
  }, [])

  const addTag = () => {
    if (newTag.trim() && formData.tags.length < 5 && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleSaveDraft = () => {
    localStorage.setItem("draft-work", JSON.stringify(formData))
    setAutoSaveStatus("saved")
    alert("Rascunho salvo localmente! Para salvar na nuvem, faça login.")
  }

  const handlePreview = () => {
    if (!formData.title || !formData.content) {
      alert("Adicione um título e conteúdo para visualizar a obra.")
      return
    }
    // Implementar preview em modal ou nova página
    console.log("Preview:", formData)
  }

  const handlePublish = () => {
    if (!formData.title || !formData.genre || !formData.content) {
      alert("Preencha pelo menos o título, gênero e conteúdo para publicar.")
      return
    }
    alert(
      `Obra "${formData.title}" criada com sucesso no modo demonstração!\n\nPara salvar e publicar suas obras permanentemente, faça login ou cadastre-se.`,
    )
  }

  const progressPercentage = Math.min((wordCount / formData.targetWords) * 100, 100)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#131313] mb-2">Escrever Nova Obra</h1>
            <p className="text-[#6e6e6e]">Crie e publique sua história para a comunidade cearense</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div
              className={`flex items-center gap-1 ${
                autoSaveStatus === "saved"
                  ? "text-green-600"
                  : autoSaveStatus === "saving"
                    ? "text-yellow-600"
                    : "text-gray-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  autoSaveStatus === "saved"
                    ? "bg-green-600"
                    : autoSaveStatus === "saving"
                      ? "bg-yellow-600"
                      : "bg-gray-600"
                }`}
              />
              {autoSaveStatus === "saved" ? "Salvo" : autoSaveStatus === "saving" ? "Salvando..." : "Não salvo"}
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <h4 className="font-medium text-blue-800 mb-2">📝 Modo de Demonstração</h4>
          <p className="text-sm text-blue-700">
            Você está no modo demonstração. Suas obras são salvas localmente no navegador. Para publicar permanentemente
            e alcançar leitores,
            <button className="underline font-medium ml-1">faça login ou cadastre-se</button>.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Writing Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Title and Basic Info */}
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-[#131313]">
                  Título da Obra *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Digite o título da sua obra..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="genre" className="text-sm font-medium text-[#131313]">
                  Gênero *
                </Label>
                <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="synopsis" className="text-sm font-medium text-[#131313]">
                Sinopse
              </Label>
              <Textarea
                id="synopsis"
                value={formData.synopsis}
                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                placeholder="Descreva brevemente sua obra para atrair leitores..."
                className="mt-1 resize-none"
                rows={3}
              />
              <p className="text-xs text-[#6e6e6e] mt-1">{formData.synopsis.length}/500 caracteres</p>
            </div>
          </Card>

          {/* Rich Text Editor */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium text-[#131313]">Conteúdo da Obra *</Label>
              <div className="flex items-center gap-4 text-sm text-[#6e6e6e]">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {wordCount} palavras
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />~{readingTime} min de leitura
                </div>
              </div>
            </div>

            <TiptapEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Comece a escrever sua história aqui...

Use os botões da barra de ferramentas para formatar seu texto. Você pode criar títulos, listas, citações e muito mais.

Dica: Inclua elementos da cultura cearense para conectar com os leitores locais!"
            />

            {/* Writing Progress */}
            <div className="mt-4 p-4 bg-[#f4f4f4] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-[#131313]">Meta de Palavras</span>
                <span className="text-sm text-[#6e6e6e]">
                  {wordCount} / {formData.targetWords}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-[#6e6e6e] mt-1">
                {progressPercentage >= 100
                  ? "🎉 Meta alcançada!"
                  : `Faltam ${formData.targetWords - wordCount} palavras para sua meta`}
              </p>
            </div>
          </div>

          {/* Tags and Settings */}
          <Card className="p-6">
            <h3 className="font-semibold text-[#131313] mb-4">Configurações</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-[#131313] mb-3 block">Tags (máximo 5)</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Digite uma tag..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    disabled={!newTag.trim() || formData.tags.length >= 5}
                    className="bg-[#009c3b] hover:bg-[#009c3b]/90"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="w-4 h-4 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="ageRating" className="text-sm font-medium text-[#131313]">
                  Classificação Etária
                </Label>
                <Select
                  value={formData.ageRating}
                  onValueChange={(value) => setFormData({ ...formData, ageRating: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRatings.map((rating) => (
                      <SelectItem key={rating.value} value={rating.value}>
                        {rating.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="mt-4">
                  <Label htmlFor="targetWords" className="text-sm font-medium text-[#131313]">
                    Meta de Palavras
                  </Label>
                  <Input
                    id="targetWords"
                    type="number"
                    value={formData.targetWords}
                    onChange={(e) => setFormData({ ...formData, targetWords: Number.parseInt(e.target.value) || 1000 })}
                    className="mt-1"
                    min="100"
                    max="50000"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleSaveDraft} variant="outline" className="flex-1 border-[#6e6e6e] text-[#6e6e6e]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Rascunho
            </Button>
            <Button
              onClick={handlePreview}
              variant="outline"
              className="flex-1 border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Button onClick={handlePublish} className="flex-1 bg-[#009c3b] hover:bg-[#009c3b]/90">
              <BookOpen className="w-4 h-4 mr-2" />
              Publicar Obra
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Writing Stats */}
          <Card className="p-4">
            <h4 className="font-semibold text-[#131313] mb-4">Estatísticas</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-[#6e6e6e]">Palavras:</span>
                <span className="text-sm font-medium">{wordCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6e6e6e]">Caracteres:</span>
                <span className="text-sm font-medium">{characterCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6e6e6e]">Tempo de leitura:</span>
                <span className="text-sm font-medium">~{readingTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#6e6e6e]">Parágrafos:</span>
                <span className="text-sm font-medium">
                  {
                    extractTextFromHTML(formData.content)
                      .split("\n\n")
                      .filter((p) => p.trim()).length
                  }
                </span>
              </div>
            </div>
          </Card>

          {/* Editor Features */}
          <Card className="p-4">
            <h4 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#009c3b]" />
              Recursos do Editor
            </h4>
            <div className="space-y-3 text-sm text-[#6e6e6e]">
              <div className="p-3 bg-[#f4f4f4] rounded">
                <p className="font-medium text-[#131313] mb-1">✨ Formatação Rica</p>
                <p>Negrito, itálico, títulos, listas e muito mais.</p>
              </div>
              <div className="p-3 bg-[#f4f4f4] rounded">
                <p className="font-medium text-[#131313] mb-1">⌨️ Atalhos de Teclado</p>
                <p>Use Ctrl+B para negrito, Ctrl+I para itálico.</p>
              </div>
              <div className="p-3 bg-[#f4f4f4] rounded">
                <p className="font-medium text-[#131313] mb-1">💾 Auto-salvamento</p>
                <p>Seu trabalho é salvo automaticamente.</p>
              </div>
            </div>
          </Card>

          {/* Writing Tips */}
          <Card className="p-4">
            <h4 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#009c3b]" />
              Dicas de Escrita
            </h4>
            <div className="space-y-3 text-sm text-[#6e6e6e]">
              <div className="p-3 bg-[#f4f4f4] rounded">
                <p className="font-medium text-[#131313] mb-1">📍 Cultura Local</p>
                <p>Inclua elementos da cultura cearense para conectar com leitores locais.</p>
              </div>
              <div className="p-3 bg-[#f4f4f4] rounded">
                <p className="font-medium text-[#131313] mb-1">📖 Leitura Online</p>
                <p>Use títulos e parágrafos curtos para facilitar a leitura na tela.</p>
              </div>
              <div className="p-3 bg-[#f4f4f4] rounded">
                <p className="font-medium text-[#131313] mb-1">🎯 Engajamento</p>
                <p>Termine capítulos com ganchos para manter o leitor interessado.</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <h4 className="font-semibold text-[#131313] mb-4">Ações Rápidas</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Metas de Escrita
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Definir Cronograma
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

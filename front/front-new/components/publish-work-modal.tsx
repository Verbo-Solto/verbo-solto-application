"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, BookOpen, Save, Eye, Plus } from "lucide-react"

interface PublishWorkModalProps {
  onClose: () => void
  editMode?: boolean
  workData?: any
}

export function PublishWorkModal({ onClose, editMode = false, workData }: PublishWorkModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: workData?.title || "",
    genre: workData?.genre || "",
    synopsis: workData?.synopsis || "",
    content: workData?.content || "",
    tags: workData?.tags || [],
    coverImage: workData?.coverImage || null,
    isPublic: workData?.isPublic ?? true,
    allowComments: workData?.allowComments ?? true,
    ageRating: workData?.ageRating || "livre",
  })

  const [newTag, setNewTag] = useState("")
  const [isDraft, setIsDraft] = useState(false)

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

  const steps = [
    { number: 1, title: "Informações Básicas", description: "Título, gênero e sinopse" },
    { number: 2, title: "Conteúdo", description: "Escreva sua obra" },
    { number: 3, title: "Configurações", description: "Tags, capa e privacidade" },
    { number: 4, title: "Revisão", description: "Revise antes de publicar" },
  ]

  const addTag = () => {
    if (newTag.trim() && formData.tags.length < 5 && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleSubmit = (asDraft = false) => {
    setIsDraft(asDraft)
    // Mostrar modal de confirmação para usuários não autenticados
    if (true) {
      // Simular usuário não autenticado
      alert(
        `Obra "${formData.title}" criada com sucesso no modo demonstração!\n\nPara salvar e publicar suas obras, faça login ou cadastre-se.`,
      )
    }
    console.log("Submitting work:", { ...formData, isDraft: asDraft })
    onClose()
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.genre && formData.synopsis.trim()
      case 2:
        return formData.content.trim().length >= 100 // Mínimo 100 caracteres
      case 3:
        return true // Configurações são opcionais
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#009c3b]" />
              <h2 className="text-xl font-bold text-[#131313]">{editMode ? "Editar Obra" : "Nova Obra"}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Auth Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">📝 Modo de Demonstração</h4>
            <p className="text-sm text-blue-700">
              Você está criando uma obra no modo demonstração. Para salvar e publicar suas obras,
              <button
                className="underline font-medium ml-1"
                onClick={() => {
                  /* Implementar redirecionamento para login */
                }}
              >
                faça login ou cadastre-se
              </button>
              .
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.number ? "bg-[#009c3b] text-white" : "bg-[#f4f4f4] text-[#6e6e6e]"
                    }`}
                  >
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 ${currentStep > step.number ? "bg-[#009c3b]" : "bg-[#f4f4f4]"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[#131313]">{steps[currentStep - 1].title}</h3>
              <p className="text-sm text-[#6e6e6e]">{steps[currentStep - 1].description}</p>
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
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

                <div>
                  <Label htmlFor="synopsis" className="text-sm font-medium text-[#131313]">
                    Sinopse *
                  </Label>
                  <Textarea
                    id="synopsis"
                    value={formData.synopsis}
                    onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    placeholder="Descreva brevemente sua obra para atrair leitores..."
                    className="mt-1 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-[#6e6e6e] mt-1">{formData.synopsis.length}/500 caracteres</p>
                </div>
              </div>
            )}

            {/* Step 2: Content */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="content" className="text-sm font-medium text-[#131313]">
                    Conteúdo da Obra *
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Escreva sua obra aqui... Você pode usar quebras de linha para separar parágrafos."
                    className="mt-1 resize-none min-h-[300px]"
                    rows={15}
                  />
                  <div className="flex justify-between text-xs text-[#6e6e6e] mt-1">
                    <span>{formData.content.length} caracteres</span>
                    <span>~{Math.ceil(formData.content.length / 1000)} min de leitura</span>
                  </div>
                </div>

                <div className="bg-[#f4f4f4] p-4 rounded-lg">
                  <h4 className="font-medium text-[#131313] mb-2">💡 Dicas de Escrita</h4>
                  <ul className="text-sm text-[#6e6e6e] space-y-1">
                    <li>• Use parágrafos curtos para facilitar a leitura</li>
                    <li>• Inclua elementos da cultura cearense para conectar com os leitores</li>
                    <li>• Revise sua obra antes de publicar</li>
                    <li>• Mínimo recomendado: 500 palavras</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Settings */}
            {currentStep === 3 && (
              <div className="space-y-6">
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
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Obra Pública</h4>
                      <p className="text-sm text-[#6e6e6e]">Qualquer pessoa pode ler sua obra</p>
                    </div>
                    <Button
                      type="button"
                      variant={formData.isPublic ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                      className={formData.isPublic ? "bg-[#009c3b] hover:bg-[#009c3b]/90" : ""}
                    >
                      {formData.isPublic ? "Público" : "Privado"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#f4f4f4] rounded-lg">
                    <div>
                      <h4 className="font-medium text-[#131313]">Permitir Comentários</h4>
                      <p className="text-sm text-[#6e6e6e]">Leitores podem comentar e avaliar</p>
                    </div>
                    <Button
                      type="button"
                      variant={formData.allowComments ? "default" : "outline"}
                      onClick={() => setFormData({ ...formData, allowComments: !formData.allowComments })}
                      className={formData.allowComments ? "bg-[#009c3b] hover:bg-[#009c3b]/90" : ""}
                    >
                      {formData.allowComments ? "Permitir" : "Bloquear"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-[#f4f4f4] p-6 rounded-lg">
                  <h3 className="font-semibold text-[#131313] mb-4">Revisão da Obra</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-[#131313] mb-2">Informações Básicas</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-[#6e6e6e]">Título:</span> {formData.title}
                        </div>
                        <div>
                          <span className="text-[#6e6e6e]">Gênero:</span> {formData.genre}
                        </div>
                        <div>
                          <span className="text-[#6e6e6e]">Classificação:</span>{" "}
                          {ageRatings.find((r) => r.value === formData.ageRating)?.label}
                        </div>
                        <div>
                          <span className="text-[#6e6e6e]">Caracteres:</span> {formData.content.length}
                        </div>
                        <div>
                          <span className="text-[#6e6e6e]">Tempo de leitura:</span> ~
                          {Math.ceil(formData.content.length / 1000)} min
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#131313] mb-2">Configurações</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-[#6e6e6e]">Visibilidade:</span>{" "}
                          {formData.isPublic ? "Público" : "Privado"}
                        </div>
                        <div>
                          <span className="text-[#6e6e6e]">Comentários:</span>{" "}
                          {formData.allowComments ? "Permitidos" : "Bloqueados"}
                        </div>
                        <div>
                          <span className="text-[#6e6e6e]">Tags:</span>{" "}
                          {formData.tags.length > 0 ? formData.tags.join(", ") : "Nenhuma"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-[#131313] mb-2">Sinopse</h4>
                    <p className="text-sm text-[#6e6e6e] bg-white p-3 rounded border">{formData.synopsis}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">⚠️ Antes de Publicar</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Revise sua obra para erros de ortografia e gramática</li>
                    <li>• Certifique-se de que o conteúdo está completo</li>
                    <li>• Verifique se as tags representam bem sua obra</li>
                    <li>• Lembre-se: você pode editar sua obra após a publicação</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#e2e2e2]">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Voltar
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {currentStep < 4 && (
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  className="border-[#6e6e6e] text-[#6e6e6e]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </Button>
              )}

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="bg-[#009c3b] hover:bg-[#009c3b]/90"
                >
                  Próximo
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit(true)}
                    className="border-[#6e6e6e] text-[#6e6e6e]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Rascunho
                  </Button>
                  <Button onClick={() => handleSubmit(false)} className="bg-[#009c3b] hover:bg-[#009c3b]/90">
                    <Eye className="w-4 h-4 mr-2" />
                    Publicar Obra
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

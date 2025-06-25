"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Search, Filter } from "lucide-react"

interface FiltrosExploracaoProps {
  filtros: {
    genero: string
    cidade: string
    tags: string[]
    ordenarPor: string
    busca: string
  }
  onFiltrosChange: (filtros: any) => void
}

export function FiltrosExploracao({ filtros, onFiltrosChange }: FiltrosExploracaoProps) {
  const [novaTag, setNovaTag] = useState("")

  const generos = [
    "Romance",
    "Ficção",
    "Poesia",
    "Crônica",
    "Conto",
    "Drama",
    "Comédia",
    "Suspense",
    "Terror",
    "Fantasia",
    "Biografia",
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

  const tagsPopulares = [
    "ceará",
    "nordeste",
    "sertão",
    "praia",
    "família",
    "amor",
    "amizade",
    "superação",
    "tradição",
    "cultura",
    "história",
  ]

  const adicionarTag = (tag: string) => {
    if (tag && !filtros.tags.includes(tag)) {
      onFiltrosChange({
        ...filtros,
        tags: [...filtros.tags, tag],
      })
    }
    setNovaTag("")
  }

  const removerTag = (tagParaRemover: string) => {
    onFiltrosChange({
      ...filtros,
      tags: filtros.tags.filter((tag) => tag !== tagParaRemover),
    })
  }

  const limparFiltros = () => {
    onFiltrosChange({
      genero: "",
      cidade: "",
      tags: [],
      ordenarPor: "recente",
      busca: "",
    })
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-[#e5e5e5]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#131313] flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtros
        </h3>
        <Button variant="ghost" size="sm" onClick={limparFiltros} className="text-[#6e6e6e] hover:text-[#131313]">
          Limpar
        </Button>
      </div>

      {/* Busca */}
      <div className="space-y-2">
        <Label htmlFor="busca" className="text-sm font-medium text-[#131313]">
          Buscar
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
          <Input
            id="busca"
            placeholder="Título, autor ou palavra-chave..."
            value={filtros.busca}
            onChange={(e) => onFiltrosChange({ ...filtros, busca: e.target.value })}
            className="pl-10 border-[#e5e5e5] focus:border-[#ff6b35] focus:ring-[#ff6b35]"
          />
        </div>
      </div>

      {/* Gênero */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#131313]">Gênero</Label>
        <Select value={filtros.genero} onValueChange={(value) => onFiltrosChange({ ...filtros, genero: value })}>
          <SelectTrigger className="border-[#e5e5e5] focus:border-[#ff6b35] focus:ring-[#ff6b35]">
            <SelectValue placeholder="Selecione um gênero" />
          </SelectTrigger>
          <SelectContent>
            {generos.map((genero) => (
              <SelectItem key={genero} value={genero}>
                {genero}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cidade */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#131313]">Cidade</Label>
        <Select value={filtros.cidade} onValueChange={(value) => onFiltrosChange({ ...filtros, cidade: value })}>
          <SelectTrigger className="border-[#e5e5e5] focus:border-[#ff6b35] focus:ring-[#ff6b35]">
            <SelectValue placeholder="Selecione uma cidade" />
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

      {/* Tags */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#131313]">Tags</Label>

        {/* Input para nova tag */}
        <div className="flex gap-2">
          <Input
            placeholder="Adicionar tag..."
            value={novaTag}
            onChange={(e) => setNovaTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                adicionarTag(novaTag)
              }
            }}
            className="flex-1 border-[#e5e5e5] focus:border-[#ff6b35] focus:ring-[#ff6b35]"
          />
          <Button
            size="sm"
            onClick={() => adicionarTag(novaTag)}
            className="bg-[#ff6b35] hover:bg-[#e55a2b] text-white"
          >
            +
          </Button>
        </div>

        {/* Tags populares */}
        <div className="space-y-2">
          <p className="text-xs text-[#6e6e6e]">Tags populares:</p>
          <div className="flex flex-wrap gap-1">
            {tagsPopulares.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                onClick={() => adicionarTag(tag)}
                className="h-6 px-2 text-xs border-[#e5e5e5] hover:border-[#ff6b35] hover:text-[#ff6b35]"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Tags selecionadas */}
        {filtros.tags.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-[#6e6e6e]">Tags selecionadas:</p>
            <div className="flex flex-wrap gap-1">
              {filtros.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[#ff6b35] text-white hover:bg-[#e55a2b] cursor-pointer"
                  onClick={() => removerTag(tag)}
                >
                  {tag}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Ordenação */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#131313]">Ordenar por</Label>
        <Select
          value={filtros.ordenarPor}
          onValueChange={(value) => onFiltrosChange({ ...filtros, ordenarPor: value })}
        >
          <SelectTrigger className="border-[#e5e5e5] focus:border-[#ff6b35] focus:ring-[#ff6b35]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recente">Mais recente</SelectItem>
            <SelectItem value="popular">Mais popular</SelectItem>
            <SelectItem value="curtidas">Mais curtidas</SelectItem>
            <SelectItem value="comentarios">Mais comentadas</SelectItem>
            <SelectItem value="alfabetico">Ordem alfabética</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, X, Filter } from "lucide-react"

interface ExploreFiltersProps {
  filters: {
    genre: string
    city: string
    tags: string[]
    sortBy: string
    search: string
  }
  onFiltersChange: (filters: any) => void
}

export function ExploreFilters({ filters, onFiltersChange }: ExploreFiltersProps) {
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
    "Canindé",
    "Aquiraz",
    "Pacatuba",
    "Crateús",
    "Aracati",
  ]

  const popularTags = [
    "Tradição",
    "Família",
    "Amor",
    "Sertão",
    "Nordeste",
    "Cultura",
    "Memória",
    "Juventude",
    "Cidade",
    "Interior",
    "Folclore",
    "História",
  ]

  const sortOptions = [
    { value: "recent", label: "Mais Recentes" },
    { value: "popular", label: "Mais Populares" },
    { value: "rating", label: "Melhor Avaliadas" },
    { value: "views", label: "Mais Lidas" },
    { value: "title", label: "Ordem Alfabética" },
  ]

  const updateFilters = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const addTag = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      updateFilters("tags", [...filters.tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    updateFilters(
      "tags",
      filters.tags.filter((t) => t !== tag),
    )
  }

  const clearFilters = () => {
    onFiltersChange({
      genre: "",
      city: "",
      tags: [],
      sortBy: "recent",
      search: "",
    })
  }

  const hasActiveFilters = filters.genre || filters.city || filters.tags.length > 0 || filters.search

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-[#131313] mb-3 block">
          <Search className="w-4 h-4 inline mr-2" />
          Buscar
        </Label>
        <Input
          placeholder="Título, autor, conteúdo..."
          value={filters.search}
          onChange={(e) => updateFilters("search", e.target.value)}
        />
      </Card>

      {/* Sort */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-[#131313] mb-3 block">Ordenar por</Label>
        <Select value={filters.sortBy} onValueChange={(value) => updateFilters("sortBy", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Genre Filter */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-[#131313] mb-3 block">Gênero</Label>
        <Select value={filters.genre} onValueChange={(value) => updateFilters("genre", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os gêneros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* City Filter */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-[#131313] mb-3 block">Cidade</Label>
        <Select value={filters.city} onValueChange={(value) => updateFilters("city", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as cidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as cidades</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Tags Filter */}
      <Card className="p-4">
        <Label className="text-sm font-medium text-[#131313] mb-3 block">Tags Populares</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={filters.tags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${
                filters.tags.includes(tag) ? "bg-[#009c3b] hover:bg-[#009c3b]/90" : "hover:border-[#009c3b]"
              }`}
              onClick={() => (filters.tags.includes(tag) ? removeTag(tag) : addTag(tag))}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {filters.tags.length > 0 && (
          <div className="pt-3 border-t border-[#e2e2e2]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#6e6e6e]">Tags selecionadas:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilters("tags", [])}
                className="text-xs text-[#6e6e6e] p-0 h-auto"
              >
                Limpar
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {filters.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-3 h-3 p-0 ml-1 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          Limpar Filtros
        </Button>
      )}
    </div>
  )
}

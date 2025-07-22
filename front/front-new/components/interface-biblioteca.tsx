"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Heart, Star, Clock, Users, Filter, Grid, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from "axios"

export function InterfaceBiblioteca() {
  const [abaAtiva, setAbaAtiva] = useState("lendo")
  const [modoVisualizacao, setModoVisualizacao] = useState<"grade" | "lista">("grade")

  // Dados reais
  const [leituras, setLeituras] = useState<any[]>([])
  const [finalizados, setFinalizados] = useState<any[]>([])
  const [favoritos, setFavoritos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;
    setLoading(true);
    axios.get("http://localhost:8000/api/biblioteca/", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(resp => {
      setLeituras(resp.data.lendo || [])
      setFinalizados(resp.data.finalizados || [])
      setFavoritos(resp.data.favoritos || [])
    }).finally(() => setLoading(false));
  }, []);

  const estatisticasLeitura = {
    livrosLidos: finalizados.length,
    livrosLendo: leituras.length,
    livrosFavoritos: favoritos.length,
    tempoTotalLeitura: "-",
    avaliacaoMedia: finalizados.length > 0 ? (finalizados.reduce((acc, l) => acc + (l.avaliacao || 0), 0) / finalizados.length).toFixed(1) : "-",
    sequenciaLeitura: "-",
  }

  const renderizarCardLivro = (livro: any, tipo: "lendo" | "finalizado" | "favorito") => {
    if (modoVisualizacao === "lista") {
      return (
        <Card key={livro.id} className="p-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-20 ${livro.corCapa} rounded flex items-center justify-center flex-shrink-0`}>
              <BookOpen className="w-8 h-8 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-[#131313]">{livro.titulo}</h4>
                  <p className="text-sm text-[#6e6e6e]">por {livro.autor}</p>
                </div>
                <Badge variant="outline">{livro.genero}</Badge>
              </div>

              {tipo === "lendo" && (
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{livro.progresso}%</span>
                  </div>
                  <Progress value={livro.progresso} className="h-2" />
                  <p className="text-xs text-[#6e6e6e] mt-1">
                    Última leitura: {livro.ultimaLeitura} • {livro.tempoEstimado}
                  </p>
                </div>
              )}

              {tipo === "finalizado" && (
                <div className="flex items-center gap-4 text-sm text-[#6e6e6e]">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < livro.avaliacao ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span>Finalizado {livro.finalizadoEm}</span>
                </div>
              )}

              {tipo === "favorito" && (
                <div className="flex items-center gap-4 text-sm text-[#6e6e6e]">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span>Favorito</span>
                  </div>
                  <span>Adicionado {livro.adicionadoEm}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/obra/${livro.id}`}>
                <Button variant="outline" size="sm">
                  {tipo === "lendo" ? "Continuar" : "Ler"}
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card key={livro.id} className="overflow-hidden">
        <div className={`w-full h-48 ${livro.corCapa} flex items-center justify-center`}>
          <BookOpen className="w-16 h-16 text-white/80" />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {livro.genero}
            </Badge>
          </div>
          <h4 className="font-semibold text-[#131313] mb-1">{livro.titulo}</h4>
          <p className="text-sm text-[#6e6e6e] mb-3">por {livro.autor}</p>

          {tipo === "lendo" && (
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Progresso</span>
                <span>{livro.progresso}%</span>
              </div>
              <Progress value={livro.progresso} className="h-2" />
              <p className="text-xs text-[#6e6e6e] mt-1">{livro.tempoEstimado}</p>
            </div>
          )}

          {tipo === "finalizado" && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < livro.avaliacao ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}

          {tipo === "favorito" && (
            <div className="flex items-center gap-1 mb-3">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-sm text-[#6e6e6e]">Favorito</span>
            </div>
          )}

          <Link href={`/obra/${livro.id}`}>
            <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
              {tipo === "lendo" ? "Continuar Lendo" : "Ler Novamente"}
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#131313] mb-2">Minha Biblioteca</h1>
        <p className="text-[#6e6e6e]">Acompanhe suas leituras e descubra novas histórias</p>
      </div>

      {/* Estatísticas de Leitura */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-4 text-center">
          <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{estatisticasLeitura.livrosLidos}</div>
          <div className="text-sm text-[#6e6e6e]">Lidas</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-lg font-bold text-[#131313]">{estatisticasLeitura.livrosLendo}</div>
          <div className="text-sm text-[#6e6e6e]">Lendo</div>
        </Card>
        <Card className="p-4 text-center">
          <Heart className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{estatisticasLeitura.livrosFavoritos}</div>
          <div className="text-sm text-[#6e6e6e]">Favoritas</div>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-lg font-bold text-[#131313]">{estatisticasLeitura.tempoTotalLeitura}</div>
          <div className="text-sm text-[#6e6e6e]">Tempo Lendo</div>
        </Card>
        <Card className="p-4 text-center">
          <Star className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{estatisticasLeitura.avaliacaoMedia}</div>
          <div className="text-sm text-[#6e6e6e]">Avaliação Média</div>
        </Card>
        <Card className="p-4 text-center">
          <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#131313]">{estatisticasLeitura.sequenciaLeitura}</div>
          <div className="text-sm text-[#6e6e6e]">Dias Seguidos</div>
        </Card>
      </div>

      {/* Abas de Navegação */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-[#f4f4f4] p-1 rounded-lg">
          <Button
            variant={abaAtiva === "lendo" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("lendo")}
            className={
              abaAtiva === "lendo"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Lendo ({leituras.length})
          </Button>
          <Button
            variant={abaAtiva === "finalizadas" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("finalizadas")}
            className={
              abaAtiva === "finalizadas"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Finalizadas ({finalizados.length})
          </Button>
          <Button
            variant={abaAtiva === "favoritas" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("favoritas")}
            className={
              abaAtiva === "favoritas"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Favoritas ({favoritos.length})
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
            <Input placeholder="Buscar na biblioteca..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <div className="flex gap-1 bg-[#f4f4f4] p-1 rounded">
            <Button
              variant={modoVisualizacao === "grade" ? "default" : "ghost"}
              size="icon"
              onClick={() => setModoVisualizacao("grade")}
              className={modoVisualizacao === "grade" ? "bg-white shadow-sm" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={modoVisualizacao === "lista" ? "default" : "ghost"}
              size="icon"
              onClick={() => setModoVisualizacao("lista")}
              className={modoVisualizacao === "lista" ? "bg-white shadow-sm" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo baseado na aba ativa */}
      {abaAtiva === "lendo" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Continue Lendo</h3>
          {loading ? <p>Carregando...</p> : (
            <div className={modoVisualizacao === "grade" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
              {leituras.map((livro) => renderizarCardLivro(livro, "lendo"))}
            </div>
          )}
        </div>
      )}

      {abaAtiva === "finalizadas" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Obras Finalizadas</h3>
          {loading ? <p>Carregando...</p> : (
            <div className={modoVisualizacao === "grade" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
              {finalizados.map((livro) => renderizarCardLivro(livro, "finalizado"))}
            </div>
          )}
        </div>
      )}

      {abaAtiva === "favoritas" && (
        <div>
          <h3 className="text-xl font-semibold text-[#131313] mb-6">Obras Favoritas</h3>
          {loading ? <p>Carregando...</p> : (
            <div className={modoVisualizacao === "grade" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
              {favoritos.map((livro) => renderizarCardLivro(livro, "favorito"))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

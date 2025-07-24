"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Plus,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"

export function InterfaceMinhasObras() {
  const [abaAtiva, setAbaAtiva] = useState("publicadas")
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [obrasPublicadas, setObrasPublicadas] = useState<any[]>([])
  const [rascunhos, setRascunhos] = useState<any[]>([])
  const [estatisticas, setEstatisticas] = useState({
    totalObras: 0,
    totalVisualizacoes: 0,
    totalCurtidas: 0,
    totalComentarios: 0,
    seguidores: 0,
    avaliacaoMedia: 0,
  })
  const [sucesso, setSucesso] = useState<string | null>(null)
  const [colecoes, setColecoes] = useState<any[]>([])
  const [novaColecao, setNovaColecao] = useState<string>("")
  const [colecaoExpandida, setColecaoExpandida] = useState<string | null>(null)

  // Busca as obras do usuário autenticado
  useEffect(() => {
    async function fetchObras() {
      setCarregando(true)
      setErro(null)
      try {
        const token = localStorage.getItem("access")
        if (!token) {
          setErro("Você precisa estar logado para ver suas obras.")
          setCarregando(false)
          return
        }
        const resp = await axios.get("http://localhost:8000/api/obras/minhas/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        // resp.data = { publicadas: [...], rascunhos: [...] } ou lista única
        let publicadas = []
        let rascunhos = []
        if (Array.isArray(resp.data)) {
          // Caso o endpoint retorne lista única (minhas-obras)
          publicadas = resp.data.filter((o) => o.status === "publicada")
          rascunhos = resp.data.filter((o) => o.status === "rascunho")
        } else {
          // Caso o endpoint retorne {publicadas, rascunhos}
          publicadas = resp.data.publicadas || []
          rascunhos = resp.data.rascunhos || []
        }
        setObrasPublicadas(publicadas)
        setRascunhos(rascunhos)

        // Estatísticas rápidas
        const todas = [...publicadas, ...rascunhos]
        setEstatisticas({
          totalObras: todas.length,
          totalVisualizacoes: todas.reduce((acc, o) => acc + (o.visualizacoes || 0), 0),
          totalCurtidas: todas.reduce((acc, o) => acc + (o.curtidas || 0), 0),
          totalComentarios: todas.reduce((acc, o) => acc + (o.comentarios || 0), 0),
          seguidores: 0,
          avaliacaoMedia:
            todas.length > 0
              ? Math.round(
                  (todas.reduce((acc, o) => acc + (o.avaliacao_media || 0), 0) /
                  todas.length) * 10
                ) / 10
              : 0,
        })
      } catch (err) {
        setErro("Erro ao carregar suas obras.")
      }
      setCarregando(false)
    }
    fetchObras()
  }, [])

  // Função para buscar coleções
  const fetchColecoes = async () => {
    try {
      const token = localStorage.getItem("access")
      if (!token) return
      const resp = await axios.get("http://localhost:8000/api/colecoes/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Lida com respostas paginadas ou não paginadas
      const colecoesData = resp.data.results || resp.data
      setColecoes(Array.isArray(colecoesData) ? colecoesData : [])
    } catch {
      setColecoes([])
    }
  }

  // Busca as coleções do usuário
  useEffect(() => {
    fetchColecoes()
  }, [])

  const toggleColecao = (id: string) => {
    setColecaoExpandida(colecaoExpandida === id ? null : id)
  }

  // Cria uma nova coleção
  async function criarColecao() {
    if (!novaColecao.trim()) return
    try {
      const token = localStorage.getItem("access")
      if (!token) return
      await axios.post(
        "http://localhost:8000/api/colecoes/",
        { nome: novaColecao, descricao: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setNovaColecao("")
      await fetchColecoes() // Re-busca as coleções
    } catch {
      alert("Erro ao criar coleção.")
    }
  }

  // Função para excluir uma obra
  async function excluirObra(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir esta obra?")) return
    try {
      const token = localStorage.getItem("access")
      if (!token) {
        setErro("Você precisa estar logado para excluir obras.")
        return
      }
      await axios.delete(`http://localhost:8000/api/obras/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setObrasPublicadas((prev) => prev.filter((obra) => obra.id !== id))
      setRascunhos((prev) => prev.filter((obra) => obra.id !== id))
      setSucesso("Obra excluída com sucesso!")
      setTimeout(() => setSucesso(null), 3000)
    } catch {
      setErro("Erro ao excluir obra.")
      setTimeout(() => setErro(null), 3000)
    }
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#131313] mb-2">Minhas Obras</h1>
              <p className="text-[#6e6e6e]">Gerencie suas publicações e rascunhos</p>
            </div>
            <Link href="/escrever">
              <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90">
                <Plus className="w-4 h-4 mr-2" />
                Nova Obra
              </Button>
            </Link>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalObras}</div>
              <div className="text-sm text-[#6e6e6e]">Obras</div>
            </Card>
            <Card className="p-4 text-center">
              <Eye className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalVisualizacoes.toLocaleString()}</div>
              <div className="text-sm text-[#6e6e6e]">Visualizações</div>
            </Card>
            <Card className="p-4 text-center">
              <Heart className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalCurtidas}</div>
              <div className="text-sm text-[#6e6e6e]">Curtidas</div>
            </Card>
            <Card className="p-4 text-center">
              <MessageCircle className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticas.totalComentarios}</div>
              <div className="text-sm text-[#6e6e6e]">Comentários</div>
            </Card>
            <Card className="p-4 text-center">
              <Users className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticas.seguidores}</div>
              <div className="text-sm text-[#6e6e6e]">Seguidores</div>
            </Card>
            <Card className="p-4 text-center">
              <Star className="w-6 h-6 text-[#009c3b] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#131313]">{estatisticas.avaliacaoMedia}</div>
              <div className="text-sm text-[#6e6e6e]">Avaliação</div>
            </Card>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex gap-1 mb-8 bg-[#f4f4f4] p-1 rounded-lg w-fit">
          <Button
            variant={abaAtiva === "publicadas" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("publicadas")}
            className={
              abaAtiva === "publicadas"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Publicadas ({obrasPublicadas.length})
          </Button>
          <Button
            variant={abaAtiva === "rascunhos" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("rascunhos")}
            className={
              abaAtiva === "rascunhos"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Rascunhos ({rascunhos.length})
          </Button>
          <Button
            variant={abaAtiva === "estatisticas" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("estatisticas")}
            className={
              abaAtiva === "estatisticas"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Estatísticas
          </Button>
          <Button
            variant={abaAtiva === "colecoes" ? "default" : "ghost"}
            onClick={() => setAbaAtiva("colecoes")}
            className={
              abaAtiva === "colecoes"
                ? "bg-[#009c3b] text-white shadow-sm hover:bg-[#009c3b]/90 border border-[#009c3b]"
                : "hover:bg-[#009c3b]/10 border border-[#009c3b] text-[#131313]"
            }
          >
            Coleções ({colecoes.length})
          </Button>
        </div>

        {/* Feedback de erro/carregando */}
        {carregando && (
          <div className="text-center text-[#009c3b] my-8">Carregando suas obras...</div>
        )}
        {erro && (
          <div className="text-center text-red-600 my-8">{erro}</div>
        )}
        {sucesso && (
          <div className="text-center text-green-600 my-8">{sucesso}</div>
        )}

        {/* Conteúdo baseado na aba ativa */}
        {!carregando && !erro && (
          <>
            {abaAtiva === "publicadas" && (
              <div className="grid gap-6">
                {obrasPublicadas.length === 0 ? (
                  <div className="text-center text-[#6e6e6e] py-12">
                    Nenhuma obra publicada ainda.
                  </div>
                ) : (
                  obrasPublicadas.map((obra) => (
                  <Card key={obra.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Exibe a capa da obra se existir */}
                      {obra.capa && (
                        <div className="flex-shrink-0 w-full md:w-[90px] h-auto md:h-[120px] rounded-lg overflow-hidden border border-[#e5e7eb] bg-[#f4f4f4] flex items-center justify-center">
                          <img
                            src={`data:image/png;base64,${obra.capa}`}
                            alt={`Capa de ${obra.titulo}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-[#131313] truncate" title={obra.titulo}>{obra.titulo}</h4>
                          <Badge className="bg-[#009c3b] flex-shrink-0">Publicada</Badge>
                        </div>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-[#6e6e6e] mb-3">
                          <span>{obra.genero}</span>
                          <span className="hidden sm:inline">•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {obra.publicada_em
                              ? new Date(obra.publicada_em).toLocaleDateString("pt-BR")
                              : ""}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {(obra.tags || []).map((tag: any) => (
                            <Badge key={typeof tag === "string" ? tag : tag.nome} variant="outline" className="text-xs">
                              {typeof tag === "string" ? tag : tag.nome}
                            </Badge>
                          ))}
                        </div>
                        {/* Quebra de linhas no resumo */}
                        {obra.resumo && (
                          <div className="text-sm text-[#6e6e6e] mb-3 whitespace-pre-line break-all">
                            {obra.resumo}
                          </div>
                        )}
                        <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-[#6e6e6e]">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {obra.visualizacoes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {obra.curtidas}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {obra.comentarios}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {obra.avaliacao_media}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-start md:justify-end gap-2 mt-4 md:mt-0 md:flex-col md:items-end">
                        <Link href={`/obra/${obra.id}`}>
                          <Button variant="ghost" size="icon" title="Visualizar">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/escrever?editar=${obra.id}`}>
                          <Button variant="ghost" size="icon" title="Editar">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          title="Excluir"
                          onClick={() => excluirObra(obra.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Mais opções">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
                )}
              </div>
            )}
            {abaAtiva === "rascunhos" && (
              <div className="grid gap-6">
                {rascunhos.length === 0 ? (
                  <div className="text-center text-[#6e6e6e] py-12">
                    Nenhum rascunho salvo ainda.
                  </div>
                ) : (
                  rascunhos.map((obra) => (
                  <Card key={obra.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Exibe a capa da obra se existir */}
                      {obra.capa && (
                        <div className="flex-shrink-0 w-full md:w-[90px] h-auto md:h-[120px] rounded-lg overflow-hidden border border-[#e5e7eb] bg-[#f4f4f4] flex items-center justify-center">
                          <img
                            src={`data:image/png;base64,${obra.capa}`}
                            alt={`Capa de ${obra.titulo}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-[#131313] truncate" title={obra.titulo}>{obra.titulo}</h4>
                          <Badge variant="secondary" className="flex-shrink-0">Rascunho</Badge>
                        </div>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-[#6e6e6e] mb-3">
                          <span>{obra.genero}</span>
                          <span className='hidden sm:inline'>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Editado em {obra.atualizado_em
                              ? new Date(obra.atualizado_em).toLocaleDateString("pt-BR")
                              : ""}
                          </div>
                          <span className='hidden sm:inline'>•</span>
                          <span>
                            {obra.conteudo ? obra.conteudo.split(/\s+/).filter(Boolean).length : 0} palavras
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {(obra.tags || []).map((tag: any) => (
                            <Badge key={typeof tag === "string" ? tag : tag.nome} variant="outline" className="text-xs">
                              {typeof tag === "string" ? tag : tag.nome}
                            </Badge>
                          ))}
                        </div>
                        {/* Quebra de linhas no resumo */}
                        {obra.resumo && (
                          <div className="text-sm text-[#6e6e6e] mb-3 whitespace-pre-line break-all">
                            {obra.resumo}
                          </div>
                        )}
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progresso estimado</span>
                            <span>
                              {obra.conteudo
                                ? Math.round((obra.conteudo.split(/\s+/).filter(Boolean).length / 2000) * 100)
                                : 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              obra.conteudo
                                ? Math.round((obra.conteudo.split(/\s+/).filter(Boolean).length / 2000) * 100)
                                : 0
                            }
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-start md:justify-end gap-2 mt-4 md:mt-0">
                        <Link href={`/escrever?rascunho=${obra.id}`}>
                          <Button
                            variant="outline"
                            className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white w-full sm:w-auto"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Continuar Escrevendo
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          title="Excluir"
                          onClick={() => excluirObra(obra.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
                )}
              </div>
            )}
            {abaAtiva === "estatisticas" && (
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="font-semibold text-[#131313] mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#009c3b]" />
                    Crescimento de Visualizações
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Este mês</span>
                        <span>+2.3k visualizações</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mês anterior</span>
                        <span>+1.8k visualizações</span>
                      </div>
                      <Progress value={65} />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-[#131313] mb-4">Obras Mais Populares</h3>
                  <div className="space-y-3">
                    {obrasPublicadas
                      .sort((a, b) => b.visualizacoes - a.visualizacoes)
                      .map((obra) => (
                        <div key={obra.id} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{obra.titulo}</span>
                          <span className="text-sm text-[#6e6e6e]">{obra.visualizacoes} visualizações</span>
                        </div>
                      ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-[#131313] mb-4">Engajamento por Gênero</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ficção Científica</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-20" />
                        <span className="text-sm text-[#6e6e6e]">90%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Aventura</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20" />
                        <span className="text-sm text-[#6e6e6e]">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Crônica</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20" />
                        <span className="text-sm text-[#6e6e6e]">60%</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold text-[#131313] mb-4">Metas de Escrita</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Obras publicadas este ano</span>
                        <span>3 / 5</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Palavras escritas este mês</span>
                        <span>8.2k / 10k</span>
                      </div>
                      <Progress value={82} />
                    </div>
                  </div>
                </Card>
              </div>
            )}
            {abaAtiva === "colecoes" && (
              <div className="grid gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-[#131313] mb-4">Minhas Coleções</h3>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={novaColecao}
                      onChange={(e) => setNovaColecao(e.target.value)}
                      placeholder="Nova coleção..."
                      className="border border-[#e5e5e5] rounded-lg px-4 py-2 flex-1"
                    />
                    <Button onClick={criarColecao} className="bg-[#009c3b] hover:bg-[#009c3b]/90 text-white">
                      Criar
                    </Button>
                  </div>
                  {colecoes.length === 0 ? (
                    <div className="text-center text-[#6e6e6e]">Nenhuma coleção criada ainda.</div>
                  ) : (
                    <div className="space-y-4">
                      {colecoes.map((colecao) => (
                        <Card key={colecao.id} className="p-4">
                          <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleColecao(colecao.id)}
                          >
                            <div>
                              <h4 className="font-semibold text-lg text-[#131313]">{colecao.nome}</h4>
                              <p className="text-sm text-[#6e6e6e]">{colecao.descricao || "Sem descrição"}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                              {colecaoExpandida === colecao.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              colecaoExpandida === colecao.id ? "max-h-screen mt-4 pt-4 border-t" : "max-h-0"
                            }`}
                          >
                            <h5 className="font-semibold text-[#131313] mb-2">Obras na coleção:</h5>
                            {colecao.obras && colecao.obras.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {colecao.obras.map((obra: any) => (
                                  <Link href={`/obra/${obra.id}`} key={obra.id}>
                                    <Card className="overflow-hidden group">
                                      <div className={`h-32 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center`}>
                                        <BookOpen className="w-10 h-10 text-white/80" />
                                      </div>
                                      <CardContent className="p-3">
                                        <h5 className="font-semibold text-sm truncate">{obra.titulo}</h5>
                                        <p className="text-xs text-gray-500">{obra.genero}</p>
                                      </CardContent>
                                    </Card>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-[#6e6e6e]">Nenhuma obra nesta coleção.</p>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
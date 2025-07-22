"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Star, Eye, Heart, Clock } from "lucide-react"
import Link from "next/link"

interface ObraDestaque {
  id: number;
  titulo: string;
  autor: { username: string; first_name?: string };
  capa?: string;
  genero: string;
  resumo?: string;
  visualizacoes: number;
  curtidas: number;
  avaliacao_media: number;
  publicada_em?: string;
  tags: { nome: string }[];
}

export function ObrasDestaque() {
  const [obras, setObras] = useState<ObraDestaque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchObras() {
      setLoading(true);
      try {
        const resp = await fetch("http://127.0.0.1:8000/api/explorar/?ordering=-destaque");
        const data = await resp.json();
        setObras(data.results || data);
      } catch {
        setObras([]);
      }
      setLoading(false);
    }
    fetchObras();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#131313] mb-4">Obras em Destaque</h2>
          <p className="text-lg text-[#6e6e6e] max-w-2xl mx-auto">
            Descubra as histórias mais populares e bem avaliadas da nossa comunidade literária cearense
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-3 text-center text-[#009c3b]">Carregando obras em destaque...</div>
          ) : obras.length === 0 ? (
            <div className="col-span-3 text-center text-[#6e6e6e]">Nenhuma obra em destaque encontrada.</div>
          ) : (
            obras.map((obra) => (
              <Card key={obra.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Capa da Obra */}
                <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                  {obra.capa ? (
                    <img
                      src={obra.capa.length > 100 ? `data:image/png;base64,${obra.capa}` : obra.capa}
                      alt={`Capa de ${obra.titulo}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <BookOpen className="w-16 h-16 text-white/80 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 text-white border-white/30">{obra.genero}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 rounded-full px-2 py-1">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">{obra.publicada_em ? new Date(obra.publicada_em).toLocaleDateString("pt-BR") : ""}</span>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={"/placeholder.svg"} alt={obra.autor?.username} />
                      <AvatarFallback>
                        {obra.autor?.username?.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-[#131313]">{obra.autor?.username}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-[#6e6e6e]">{obra.avaliacao_media?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#131313] mb-2">{obra.titulo}</h3>
                  <p className="text-sm text-[#6e6e6e] mb-4 line-clamp-3">{obra.resumo}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(obra.tags || []).map((tag) => (
                      <Badge key={tag.nome} variant="outline" className="text-xs">
                        {tag.nome}
                      </Badge>
                    ))}
                  </div>

                  {/* Estatísticas */}
                  <div className="flex items-center justify-between text-sm text-[#6e6e6e] mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{obra.visualizacoes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{obra.curtidas}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão de Leitura */}
                  <Link href={`/obra/${obra.id}`}>
                    <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Ler Obra</Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Botão Ver Todas */}
        <div className="text-center">
          <Link href="/explorar">
            <Button
              variant="outline"
              className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white px-8 py-3"
            >
              Ver Todas as Obras
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

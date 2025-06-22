"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MessageCircle,
  Star,
  Share2,
  Bookmark,
  Eye,
  Clock,
  ChevronLeft,
  ChevronRight,
  Settings,
  Users,
} from "lucide-react"

interface WorkReaderProps {
  workId: string
}

export function WorkReader({ workId }: WorkReaderProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  // Update the reading progress tracking
  const [readingProgress, setReadingProgress] = useState(35)

  // Add scroll tracking for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mock data - in real app, fetch based on workId
  const work = {
    id: workId,
    title: "Sertão Digital",
    author: "Maria Santos",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    authorBio: "Escritora cearense apaixonada por ficção científica e cultura nordestina.",
    genre: "Ficção Científica",
    tags: ["Tecnologia", "Nordeste", "Futuro", "Tradição"],
    publishedAt: "15 de Janeiro, 2024",
    readTime: "15 min",
    views: 1250,
    likes: 89,
    comments: 23,
    rating: 4.8,
    totalRatings: 45,
    city: "Fortaleza",
    followers: 156,
    content: `
      Em um futuro próximo, o sertão cearense se transforma em um hub tecnológico, mas as tradições ancestrais resistem...

      O sol nascia sobre as placas solares que cobriam os telhados de Quixadá, refletindo uma luz dourada que se misturava com o brilho dos painéis digitais espalhados pela cidade. Era 2045, e o que antes era conhecido apenas pelos monólitos rochosos agora era reconhecido mundialmente como o Vale do Silício Nordestino.

      Maria Conceição, de 78 anos, observava da janela de sua casa centenária a movimentação dos jovens programadores que caminhavam apressados pelas ruas de paralelepípedos, carregando seus tablets holográficos e falando em uma mistura de português, inglês e código binário.

      "Minha filha," disse ela para sua neta Joana, que trabalhava remotamente para uma empresa de inteligência artificial em São Francisco, "essa tecnologia toda é bonita, mas não pode esquecer de onde veio."

      Joana levantou os olhos da tela transparente que flutuava diante dela. Aos 25 anos, ela era uma das principais desenvolvedoras de IA do mundo, mas nunca havia perdido o sotaque carinhoso do interior do Ceará.

      "Vó, a senhora tem razão. Por isso estou criando um projeto especial."

      O projeto de Joana era revolucionário: uma inteligência artificial que preservava e ensinava as tradições nordestinas. Batizada de "Cordel Digital", a IA era capaz de criar literatura de cordel personalizada, contar histórias folclóricas interativas e até mesmo ensinar receitas tradicionais adaptadas para os novos tempos.

      Mas nem todos na cidade estavam felizes com as mudanças. Um grupo de tradicionalistas, liderado pelo velho Antônio Lampião (descendente do famoso cangaceiro), acreditava que a tecnologia estava destruindo a alma do sertão.

      "Essa juventude só pensa em máquina," resmungava Antônio, ajustando seu chapéu de couro enquanto caminhava pela praça central, agora equipada com bancos inteligentes que se adaptavam ao corpo de cada pessoa.

      O conflito entre tradição e modernidade chegou ao ápice quando a prefeitura anunciou a digitalização completa do arquivo histórico da cidade. Documentos centenários, fotografias antigas e até mesmo os cordéis manuscritos seriam convertidos em dados digitais.

      Foi então que Joana teve uma ideia brilhante. E se, em vez de digitalizar apenas para preservar, ela criasse uma ponte entre os dois mundos?

      Trabalhando dia e noite, ela desenvolveu o "Projeto Raízes": uma plataforma que não apenas preservava digitalmente as tradições, mas as tornava vivas e interativas. Através de realidade aumentada, as pessoas podiam ver os antigos vaqueiros cavalgando pelas ruas, ouvir as histórias dos mais velhos contadas por hologramas e até mesmo participar de festivais tradicionais em ambientes virtuais.

      O primeiro teste foi na casa de Dona Maria Conceição. Quando ela colocou os óculos de realidade aumentada que Joana havia criado, seus olhos se encheram de lágrimas. Ali, na sala de sua casa, ela podia ver seu falecido marido tocando sanfona, exatamente como ele fazia nas noites de São João de sua juventude.

      "Agora entendo, minha filha," disse ela, abraçando a neta. "A tecnologia não veio para substituir nossas tradições. Veio para dar vida nova a elas."

      A partir daquele dia, Quixadá se tornou um exemplo mundial de como a inovação tecnológica pode coexistir harmoniosamente com a preservação cultural. Turistas de todo o mundo vinham conhecer a cidade onde o futuro e o passado dançavam juntos, como um forró cósmico que ecoava pelos monólitos milenares.

      E Joana? Ela continuou programando, mas agora cada linha de código carregava um pouco da sabedoria de sua avó, cada algoritmo tinha o tempero das histórias que ouvia na infância, e cada inovação respeitava as raízes que a fizeram crescer.

      O sertão havia se tornado digital, mas sua alma permanecia intacta, pulsando no ritmo milenar do coração nordestino.
    `,
  }

  // Add reading time estimation
  const estimatedReadTime = Math.ceil(work.content.length / 200) // 200 words per minute average

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Work Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#6e6e6e] mb-4">
          <span>{work.genre}</span>
          <span>•</span>
          <span>{work.city}</span>
          <span>•</span>
          <span>{work.publishedAt}</span>
        </div>

        <h1 className="text-4xl font-bold text-[#131313] mb-4">{work.title}</h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {work.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between mb-6 p-4 bg-[#f4f4f4] rounded-lg">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={work.authorAvatar || "/placeholder.svg"} />
              <AvatarFallback>
                {work.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-[#131313]">{work.author}</h3>
              <p className="text-sm text-[#6e6e6e]">{work.authorBio}</p>
              <div className="flex items-center gap-4 text-xs text-[#6e6e6e] mt-1">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {work.followers} seguidores
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white">
            Seguir
          </Button>
        </div>

        {/* Work Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6 text-sm text-[#6e6e6e]">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {work.views} visualizações
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {work.readTime} de leitura
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {work.rating} ({work.totalRatings} avaliações)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : "text-[#6e6e6e]"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <span className="text-sm text-[#6e6e6e]">{work.likes + (isLiked ? 1 : 0)}</span>

            <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <span className="text-sm text-[#6e6e6e]">{work.comments}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? "text-[#009c3b]" : "text-[#6e6e6e]"}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>

            <Button variant="ghost" size="icon" className="text-[#6e6e6e]">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Reading Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#6e6e6e]">Progresso da leitura</span>
            <span className="text-[#009c3b] font-medium">{readingProgress}%</span>
          </div>
          <Progress value={readingProgress} className="h-2" />
        </div>
      </div>

      {/* Reading Controls */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white border border-[#e2e2e2] rounded-lg sticky top-20 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" disabled>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-[#6e6e6e]">Capítulo Único</span>
          <Button variant="ghost" size="icon" disabled>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.max(12, fontSize - 2))}>
              A-
            </Button>
            <span className="text-sm text-[#6e6e6e]">{fontSize}px</span>
            <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.min(24, fontSize + 2))}>
              A+
            </Button>
          </div>
          <div className="text-sm text-[#6e6e6e]">~{estimatedReadTime} min restantes</div>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Work Content */}
      <Card className="p-8 mb-8">
        <div className="prose prose-lg max-w-none text-[#131313] leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
          {work.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </Card>

      {/* Rating Section */}
      <Card className="p-6 mb-8">
        <h3 className="font-semibold text-[#131313] mb-4">Avalie esta obra</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Button key={i} variant="ghost" size="icon" className="w-8 h-8 p-0 hover:bg-transparent">
                <Star className="w-6 h-6 text-gray-300 hover:text-yellow-500 transition-colors" />
              </Button>
            ))}
          </div>
          <span className="text-sm text-[#6e6e6e]">Clique nas estrelas para avaliar</span>
        </div>
      </Card>
    </div>
  )
}

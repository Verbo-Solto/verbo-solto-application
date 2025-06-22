"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Users, Star, TrendingUp } from "lucide-react"

interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#009c3b]/5 to-[#009c3b]/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#131313] mb-6">
            Dê voz às suas
            <span className="text-[#009c3b] block">histórias cearenses</span>
          </h1>
          <p className="text-xl text-[#6e6e6e] mb-8 max-w-3xl mx-auto">
            A plataforma que conecta escritores independentes do Ceará com leitores apaixonados por literatura regional.
            Publique, descubra e compartilhe histórias que celebram nossa cultura.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/write">
              <Button size="lg" className="bg-[#009c3b] hover:bg-[#009c3b]/90 text-white px-8 py-3 text-lg">
                Começar a Escrever
              </Button>
            </a>
            <a href="/explore">
              <Button
                variant="outline"
                size="lg"
                className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white px-8 py-3 text-lg"
              >
                Explorar Obras
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#009c3b] rounded-lg mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#131313]">500+</div>
              <div className="text-sm text-[#6e6e6e]">Obras Publicadas</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#009c3b] rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#131313]">150+</div>
              <div className="text-sm text-[#6e6e6e]">Escritores Ativos</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#009c3b] rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#131313]">2.5k+</div>
              <div className="text-sm text-[#6e6e6e]">Avaliações</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#009c3b] rounded-lg mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#131313]">10k+</div>
              <div className="text-sm text-[#6e6e6e]">Leituras</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

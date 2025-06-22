"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Star } from "lucide-react"
import Image from "next/image"

interface HeroiProps {
  onAuthClick: (modo: "login" | "cadastro") => void
}

export function Heroi({ onAuthClick }: HeroiProps) {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 text-[#009c3b]">
          <BookOpen className="w-full h-full" />
        </div>
        <div className="absolute top-32 right-20 w-16 h-16 text-[#009c3b]">
          <Users className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-32 w-12 h-12 text-[#009c3b]">
          <Star className="w-full h-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <Image
                src="/logo-verbo-solto.png"
                alt="Verbo Solto"
                width={200}
                height={80}
                className="h-16 w-auto mx-auto lg:mx-0 mb-6"
                priority
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Onde as histórias do{" "}
              <span className="text-[#009c3b] relative">
                Ceará
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#009c3b] opacity-30"
                  viewBox="0 0 200 12"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
                </svg>
              </span>{" "}
              ganham vida
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Uma plataforma dedicada à literatura cearense, conectando escritores e leitores apaixonados pelas
              narrativas que nascem em nossa terra.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => onAuthClick("cadastro")}
                className="bg-[#009c3b] hover:bg-[#009c3b]/90 text-white px-8 py-3 text-lg group"
              >
                Comece a escrever
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onAuthClick("login")}
                className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white px-8 py-3 text-lg"
              >
                Explorar obras
              </Button>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#009c3b] mb-1">500+</div>
                <div className="text-sm text-gray-600">Obras publicadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#009c3b] mb-1">150+</div>
                <div className="text-sm text-gray-600">Escritores ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#009c3b] mb-1">10k+</div>
                <div className="text-sm text-gray-600">Leituras realizadas</div>
              </div>
            </div>
          </div>

          {/* Imagem/Ilustração */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#009c3b] to-green-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#009c3b] rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sertão Digital</div>
                    <div className="text-sm text-gray-600">por Maria Santos</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-[#009c3b] rounded-full w-3/4"></div>
                  </div>
                  <div className="text-xs text-gray-500">Progresso de leitura: 75%</div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                  <div className="flex-1 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

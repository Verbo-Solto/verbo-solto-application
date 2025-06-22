"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Star } from "lucide-react"
import Image from "next/image"

interface HeroiProps {
  onAuthClick: (modo: "login" | "cadastro") => void
}

export function Heroi({ onAuthClick }: Readonly<HeroiProps>) {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-white py-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Onde as histórias do{" "}
              <span className="text-[#009c3b] relative">
                Ceará
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

          <div className="relative">
            <div className="">
              <Image
                src="/icon-cordel.avif"
                alt="Ilustração de um escritor e leitor"
                width={500}
                height={100}
                className="w-200 h-auto object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

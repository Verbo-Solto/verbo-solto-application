"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Rodape() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção Principal */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/logo-verbo-solto.png"
                alt="Verbo Solto"
                width={150}
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A plataforma que conecta escritores e leitores cearenses, promovendo a literatura regional e dando voz às
              histórias do nosso povo.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#009c3b]">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/explorar" className="text-gray-300 hover:text-white transition-colors">
                  Explorar Obras
                </Link>
              </li>
              <li>
                <Link href="/autores" className="text-gray-300 hover:text-white transition-colors">
                  Autores Cearenses
                </Link>
              </li>
              <li>
                <Link href="/generos" className="text-gray-300 hover:text-white transition-colors">
                  Gêneros Literários
                </Link>
              </li>
              <li>
                <Link href="/eventos" className="text-gray-300 hover:text-white transition-colors">
                  Eventos Literários
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#009c3b]">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ajuda" className="text-gray-300 hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/diretrizes" className="text-gray-300 hover:text-white transition-colors">
                  Diretrizes da Comunidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#009c3b]">Newsletter</h3>
            <p className="text-gray-300 mb-4">Receba novidades sobre literatura cearense e novos autores.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#009c3b]"
              />
              <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
                <Mail className="w-4 h-4 mr-2" />
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>

        {/* Informações de Contato */}
        <div className="py-6 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#009c3b]" />
              <span>Fortaleza, Ceará - Brasil</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#009c3b]" />
              <span>(85) 9999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#009c3b]" />
              <span>contato@verbosolto.com.br</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>
            © 2024 Verbo Solto. Todos os direitos reservados.
            <span className="text-[#009c3b] ml-2">Feito com ❤️ no Ceará</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

import { BookOpen, Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#131313] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-[#009c3b]" />
              <span className="text-xl font-bold">Verbo Solto</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A plataforma que conecta escritores independentes do Ceará com leitores apaixonados por literatura
              regional.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>Ceará, Brasil</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Obras em Destaque
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Novos Autores
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Gêneros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Cidades
                </a>
              </li>
            </ul>
          </div>

          {/* For Writers */}
          <div>
            <h3 className="font-semibold mb-4">Para Escritores</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Como Publicar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Dicas de Escrita
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Comunidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#009c3b] transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@verbosolto.com"
                  className="hover:text-[#009c3b] transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  contato@verbosolto.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#009c3b] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-400">© 2024 Verbo Solto. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

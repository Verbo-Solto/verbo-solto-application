"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Star, TrendingUp, Plus, Search, Bell, User } from "lucide-react"

export function DashboardHome() {
  // Featured works data
  const featuredWorks = [
    {
      id: 1,
      title: "Sertão Digital",
      author: "Maria Santos",
      description:
        "Em um futuro próximo, o sertão cearense se transforma em um hub tecnológico, mas as tradições ancestrais resistem. Uma história que mistura inovação e cultura regional.",
      genre: "Ficção Científica",
      views: 1250,
      likes: 89,
      coverColor: "bg-gradient-to-br from-blue-500 to-teal-500",
    },
    {
      id: 2,
      title: "A Rendeira de Aquiraz",
      author: "Ana Costa",
      description:
        "Uma jovem rendeira descobre o amor através dos fios que tece, em uma história que entrelaça tradição e paixão nas praias cearenses.",
      genre: "Romance",
      views: 2100,
      likes: 156,
      coverColor: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      id: 3,
      title: "Memórias do Açude",
      author: "João Oliveira",
      description:
        "As lembranças de uma família que viveu às margens do açude, entre tempos de fartura e escassez, revelam a força do povo nordestino.",
      genre: "Drama",
      views: 890,
      likes: 67,
      coverColor: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
  ]

  // Recent works data
  const recentWorks = [
    {
      id: 4,
      title: "Contos do Cariri",
      author: "Carlos Mendes",
      description:
        "Histórias ancestrais que ecoam pelas serras do Cariri, preservando a sabedoria e o folclore de nossos antepassados em narrativas envolventes.",
      genre: "Folclore",
      views: 1450,
      likes: 98,
      coverColor: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      id: 5,
      title: "Vento Norte",
      author: "Lucia Ferreira",
      description:
        "A jornada de uma família em busca de melhores condições de vida, retratando com sensibilidade os desafios da migração interna no Nordeste.",
      genre: "Drama",
      views: 756,
      likes: 45,
      coverColor: "bg-gradient-to-br from-purple-500 to-indigo-500",
    },
    {
      id: 6,
      title: "Noites de Forró",
      author: "Roberto Silva",
      description:
        "O amor floresce ao som do forró nas noites cearenses, em uma narrativa que celebra a música e a cultura popular do nosso estado.",
      genre: "Romance",
      views: 1890,
      likes: 134,
      coverColor: "bg-gradient-to-br from-red-500 to-pink-500",
    },
  ]

  // Stats data
  const stats = [
    {
      icon: BookOpen,
      value: "500+",
      label: "Obras Publicadas",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      value: "150+",
      label: "Escritores Ativos",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Star,
      value: "2.5k+",
      label: "Avaliações",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: TrendingUp,
      value: "10k+",
      label: "Leituras",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <main className="bg-[#fdfdfd] min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        {/* Navigation Header */}
        <header className="sticky top-0 z-10 w-full bg-[#fdfdfd] border-b border-[#f4f4f4] rounded-b-lg">
          <div className="flex items-center justify-between px-24 py-4">
            {/* Logo */}
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-[#009c3b]" />
              <span className="ml-3 text-xl font-bold text-[#131313] font-['Montserrat',Helvetica]">Verbo Solto</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center gap-12">
              <a
                href="#"
                className="font-['Montserrat',Helvetica] font-normal text-[#131313] text-base tracking-[0.50px] leading-6 hover:text-[#009c3b] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="font-['Montserrat',Helvetica] font-normal text-[#131313] text-base tracking-[0.50px] leading-6 hover:text-[#009c3b] transition-colors"
              >
                Minhas Obras
              </a>
              <a
                href="#"
                className="font-['Montserrat',Helvetica] font-normal text-[#131313] text-base tracking-[0.50px] leading-6 hover:text-[#009c3b] transition-colors"
              >
                Explorar
              </a>
              <a
                href="#"
                className="font-['Montserrat',Helvetica] font-normal text-[#131313] text-base tracking-[0.50px] leading-6 hover:text-[#009c3b] transition-colors"
              >
                Comunidade
              </a>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-[#f4f4f4] hover:bg-[#f4f4f4]">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-[#f4f4f4] hover:bg-[#f4f4f4]">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-[#f4f4f4] hover:bg-[#f4f4f4]">
                <User className="w-4 h-4" />
              </Button>
              <Button className="bg-[#131313] text-[#fdfdfd] rounded-[50px] border border-[#131313] px-5 py-3 font-['Montserrat',Helvetica] font-normal text-base tracking-[0.50px] leading-6 hover:bg-[#131313]/90">
                <Plus className="w-4 h-4 mr-2" />
                Nova Obra
              </Button>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="px-6 mt-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-['Montserrat',Helvetica] font-extrabold text-[#131313] text-[48px] leading-[58px] mb-2">
                Bem-vindo de volta! 👋
              </h1>
              <p className="font-['Montserrat',Helvetica] font-normal text-[#6e6e6e] text-lg leading-6">
                Continue sua jornada literária e descubra novas histórias cearenses
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-sm bg-white rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="font-['Montserrat',Helvetica] font-bold text-[#131313] text-2xl leading-none">
                        {stat.value}
                      </div>
                      <div className="font-['Montserrat',Helvetica] font-normal text-[#6e6e6e] text-sm mt-1">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Section */}
        <section className="px-6 mt-12">
          <h2 className="font-['Montserrat',Helvetica] font-extrabold text-[#131313] text-[40px] leading-[48.5px] mb-6">
            Destaques da Semana
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {featuredWorks.map((work) => (
              <Card
                key={work.id}
                className="flex w-[468px] h-[300px] rounded-xl border-none shadow-sm bg-white flex-shrink-0"
              >
                <div
                  className={`w-[202px] h-[300px] ${work.coverColor} rounded-xl flex-shrink-0 flex items-center justify-center`}
                >
                  <BookOpen className="w-16 h-16 text-white/80" />
                </div>
                <CardContent className="flex-1 bg-[#131313] rounded-xl mt-3.5 p-0 ml-3">
                  <div className="flex flex-col gap-4 p-6 pt-8 h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-['Montserrat',Helvetica] font-medium text-[#009c3b] bg-[#009c3b]/10 px-2 py-1 rounded-full">
                          {work.genre}
                        </span>
                      </div>
                      <h3 className="font-['Montserrat',Helvetica] font-bold text-white text-[28px] leading-tight mb-2">
                        {work.title}
                      </h3>
                      <p className="font-['Montserrat',Helvetica] font-normal text-[#6e6e6e] text-sm mb-1">
                        por {work.author}
                      </p>
                      <p className="font-['Montserrat',Helvetica] font-normal text-[#d2d2d2] text-xs leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#6e6e6e]">
                        <span>{work.views} leituras</span>
                        <span>{work.likes} curtidas</span>
                      </div>
                      <Button className="bg-[#fdfdfd] text-[#131313] rounded-[50px] border border-[#f4f4f4] px-5 py-2 font-['Montserrat',Helvetica] font-medium text-sm tracking-[0.50px] leading-6 hover:bg-[#f4f4f4]">
                        Leia agora
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Works Section */}
        <section className="px-6 mt-12 pb-12">
          <h2 className="font-['Montserrat',Helvetica] font-extrabold text-[#131313] text-[40px] leading-[48.5px] mb-6">
            Publicações Recentes
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {recentWorks.map((work) => (
              <Card
                key={work.id}
                className="flex w-[468px] h-[300px] rounded-xl border-none shadow-sm bg-white flex-shrink-0"
              >
                <div
                  className={`w-[202px] h-[300px] ${work.coverColor} rounded-xl flex-shrink-0 flex items-center justify-center`}
                >
                  <BookOpen className="w-16 h-16 text-white/80" />
                </div>
                <CardContent className="flex-1 bg-[#131313] rounded-xl mt-3.5 p-0 ml-3">
                  <div className="flex flex-col gap-4 p-6 pt-8 h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-['Montserrat',Helvetica] font-medium text-[#009c3b] bg-[#009c3b]/10 px-2 py-1 rounded-full">
                          {work.genre}
                        </span>
                      </div>
                      <h3 className="font-['Montserrat',Helvetica] font-bold text-white text-[28px] leading-tight mb-2">
                        {work.title}
                      </h3>
                      <p className="font-['Montserrat',Helvetica] font-normal text-[#6e6e6e] text-sm mb-1">
                        por {work.author}
                      </p>
                      <p className="font-['Montserrat',Helvetica] font-normal text-[#d2d2d2] text-xs leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#6e6e6e]">
                        <span>{work.views} leituras</span>
                        <span>{work.likes} curtidas</span>
                      </div>
                      <Button className="bg-[#fdfdfd] text-[#131313] rounded-[50px] border border-[#f4f4f4] px-5 py-2 font-['Montserrat',Helvetica] font-medium text-sm tracking-[0.50px] leading-6 hover:bg-[#f4f4f4]">
                        Leia agora
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

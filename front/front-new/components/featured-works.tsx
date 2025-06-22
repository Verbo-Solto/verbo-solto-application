import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, MessageCircle, Eye, Clock } from "lucide-react"

export function FeaturedWorks() {
  const featuredWorks = [
    {
      id: 1,
      title: "Sertão Digital",
      author: "Maria Santos",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Ficção Científica",
      tags: ["Tecnologia", "Nordeste", "Futuro"],
      excerpt:
        "Em um futuro próximo, o sertão cearense se transforma em um hub tecnológico, mas as tradições ancestrais resistem...",
      readTime: "15 min",
      views: 1250,
      likes: 89,
      comments: 23,
      rating: 4.8,
      city: "Fortaleza",
      publishedAt: "2 dias atrás",
    },
    {
      id: 2,
      title: "Memórias do Açude",
      author: "João Oliveira",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Drama",
      tags: ["Família", "Seca", "Memória"],
      excerpt: "As lembranças de uma família que viveu às margens do açude, entre tempos de fartura e escassez...",
      readTime: "22 min",
      views: 890,
      likes: 67,
      comments: 15,
      rating: 4.6,
      city: "Quixadá",
      publishedAt: "1 semana atrás",
    },
    {
      id: 3,
      title: "A Rendeira de Aquiraz",
      author: "Ana Costa",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      genre: "Romance",
      tags: ["Tradição", "Amor", "Artesanato"],
      excerpt:
        "Uma jovem rendeira descobre o amor através dos fios que tece, em uma história que entrelaça tradição e paixão...",
      readTime: "18 min",
      views: 2100,
      likes: 156,
      comments: 42,
      rating: 4.9,
      city: "Aquiraz",
      publishedAt: "3 dias atrás",
    },
  ]

  const genres = [
    { name: "Romance", count: 89, color: "bg-pink-100 text-pink-800" },
    { name: "Drama", count: 67, color: "bg-blue-100 text-blue-800" },
    { name: "Ficção", count: 45, color: "bg-purple-100 text-purple-800" },
    { name: "Crônica", count: 78, color: "bg-green-100 text-green-800" },
    { name: "Poesia", count: 34, color: "bg-yellow-100 text-yellow-800" },
    { name: "Fantasia", count: 23, color: "bg-indigo-100 text-indigo-800" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#131313] mb-4">Obras em Destaque</h2>
          <p className="text-[#6e6e6e] max-w-2xl mx-auto">
            Descubra as histórias mais populares e bem avaliadas da nossa comunidade de escritores cearenses
          </p>
        </div>

        {/* Featured Works Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {featuredWorks.map((work) => (
            <Card key={work.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={work.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {work.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-[#131313]">{work.author}</p>
                    <p className="text-sm text-[#6e6e6e]">
                      {work.city} • {work.publishedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{work.rating}</span>
                  </div>
                </div>

                {/* Work Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {work.genre}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-[#6e6e6e]">
                      <Clock className="w-3 h-3" />
                      {work.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#131313] mb-2">{work.title}</h3>
                  <p className="text-[#6e6e6e] text-sm line-clamp-3">{work.excerpt}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {work.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-[#6e6e6e] mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {work.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {work.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {work.comments}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">Ler Obra</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Genres Section */}
        <div className="bg-[#f4f4f4] rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#131313] mb-2">Explore por Gênero</h3>
            <p className="text-[#6e6e6e]">Encontre histórias do seu gênero favorito</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre) => (
              <Card key={genre.name} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="font-semibold text-[#131313] mb-1">{genre.name}</h4>
                <Badge className={`${genre.color} text-xs`}>{genre.count} obras</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-[#131313] mb-4">Pronto para compartilhar sua história?</h3>
          <p className="text-[#6e6e6e] mb-6 max-w-2xl mx-auto">
            Junte-se à nossa comunidade de escritores e leitores. Publique suas obras e conecte-se com pessoas que
            valorizam a literatura cearense.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#009c3b] hover:bg-[#009c3b]/90">
              Publicar Minha Obra
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
            >
              Ver Todas as Obras
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

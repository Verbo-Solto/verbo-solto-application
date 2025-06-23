import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Eye, Heart, Clock } from "lucide-react"

export function RelatedWorks() {
  const relatedWorks = [
    {
      id: 1,
      title: "Memórias do Açude",
      author: "João Oliveira",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      genre: "Drama",
      tags: ["Família", "Seca", "Memória"],
      excerpt: "As lembranças de uma família que viveu às margens do açude...",
      readTime: "22 min",
      views: 890,
      likes: 67,
      rating: 4.6,
      city: "Quixadá",
    },
    {
      id: 2,
      title: "A Rendeira de Aquiraz",
      author: "Ana Costa",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      genre: "Romance",
      tags: ["Tradição", "Amor", "Artesanato"],
      excerpt: "Uma jovem rendeira descobre o amor através dos fios que tece...",
      readTime: "18 min",
      views: 2100,
      likes: 156,
      rating: 4.9,
      city: "Aquiraz",
    },
    {
      id: 3,
      title: "Contos do Cariri",
      author: "Carlos Mendes",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      genre: "Folclore",
      tags: ["Tradição", "Lendas", "Cultura"],
      excerpt: "Histórias ancestrais que ecoam pelas serras do Cariri...",
      readTime: "12 min",
      views: 1450,
      likes: 98,
      rating: 4.7,
      city: "Crato",
    },
  ]

  return (
    <section className="bg-[#f4f4f4] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#131313] mb-4">Obras Relacionadas</h2>
          <p className="text-[#6e6e6e] max-w-2xl mx-auto">
            Descubra outras histórias que você pode gostar, baseadas em seus interesses de leitura
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedWorks.map((work) => (
            <Card key={work.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <div className="p-6">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={work.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {work.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-[#131313] text-sm">{work.author}</p>
                    <p className="text-xs text-[#6e6e6e]">{work.city}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{work.rating}</span>
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
                  <h3 className="text-lg font-bold text-[#131313] mb-2">{work.title}</h3>
                  <p className="text-[#6e6e6e] text-sm line-clamp-2">{work.excerpt}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {work.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-[#6e6e6e] mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {work.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {work.likes}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90 text-sm">Ler Obra</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-[#009c3b] text-[#009c3b] hover:bg-[#009c3b] hover:text-white"
          >
            Ver Mais Obras
          </Button>
        </div>
      </div>
    </section>
  )
}

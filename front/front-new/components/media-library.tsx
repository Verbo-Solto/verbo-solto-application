import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid, List } from "lucide-react"

export function MediaLibrary() {
  const books = [
    { title: "Ready Player One", author: "Ernest Cline", color: "bg-blue-500" },
    { title: "Ready Player Two", author: "Ernest Cline", color: "bg-teal-500" },
    { title: "Project Hail Mary", author: "Andy Weir", color: "bg-purple-500" },
    { title: "The Martian", author: "Andy Weir", color: "bg-pink-500" },
    { title: "Dune", author: "Frank Herbert", color: "bg-red-500" },
    { title: "Foundation", author: "Isaac Asimov", color: "bg-orange-500" },
    { title: "Neuromancer", author: "William Gibson", color: "bg-red-600" },
    { title: "Snow Crash", author: "Neal Stephenson", color: "bg-blue-600" },
    { title: "The Expanse", author: "James S.A. Corey", color: "bg-gray-600" },
    { title: "Hyperion", author: "Dan Simmons", color: "bg-yellow-600" },
    { title: "Ender's Game", author: "Orson Scott Card", color: "bg-green-600" },
    { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", color: "bg-indigo-600" },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#1a202c] rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Library</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search books..."
                className="pl-10 bg-[#2d3748] border-[#4a5568] text-white placeholder-gray-400"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#2d3748]">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-[#2d3748]">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((book, index) => (
            <Card
              key={index}
              className={`${book.color} p-4 text-white border-0 hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="aspect-[3/4] flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                  <p className="text-xs opacity-80">{book.author}</p>
                </div>
                <div className="mt-4">
                  <div className="w-full h-1 bg-white/20 rounded">
                    <div className="h-full bg-white rounded" style={{ width: `${Math.random() * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
          <span>Recently Added</span>
          <span>12 books</span>
        </div>
      </div>
    </div>
  )
}

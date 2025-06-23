"use client"

import { Header } from "@/components/header"
import { ExploreFilters } from "@/components/explore-filters"
import { WorkGrid } from "@/components/work-grid"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    genre: "",
    city: "",
    tags: [],
    sortBy: "recent",
    search: "",
  })

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#131313] mb-2">Explorar Obras</h1>
          <p className="text-[#6e6e6e]">Descubra histórias incríveis de escritores cearenses</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ExploreFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <WorkGrid filters={filters} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

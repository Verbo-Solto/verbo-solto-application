"use client"

import { Header } from "@/components/header"
import { LibraryInterface } from "@/components/library-interface"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} isAuthenticated={true} />
      <LibraryInterface />
    </div>
  )
}

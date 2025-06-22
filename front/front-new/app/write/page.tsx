"use client"

import { Header } from "@/components/header"
import { WriteInterface } from "@/components/write-interface"

export default function WritePage() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} isAuthenticated={true} />
      <WriteInterface />
    </div>
  )
}

"use client"

import { Header } from "@/components/header"
import { MyWorksInterface } from "@/components/my-works-interface"

export default function MyWorksPage() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} isAuthenticated={true} />
      <MyWorksInterface />
    </div>
  )
}

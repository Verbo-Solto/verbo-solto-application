"use client"

import { Header } from "@/components/header"
import { DashboardHome } from "@/components/dashboard-home"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} isAuthenticated={true} />
      <DashboardHome />
    </div>
  )
}

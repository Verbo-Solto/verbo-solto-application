"use client"

import { Header } from "@/components/header"
import { ProfileInterface } from "@/components/profile-interface"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} isAuthenticated={true} />
      <ProfileInterface />
    </div>
  )
}

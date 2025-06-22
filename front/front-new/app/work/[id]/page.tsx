"use client"
import { Header } from "@/components/header"
import { WorkReader } from "@/components/work-reader"
import { WorkComments } from "@/components/work-comments"
import { RelatedWorks } from "@/components/related-works"

export default function WorkPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header onAuthClick={() => {}} />
      <WorkReader workId={params.id} />
      <WorkComments workId={params.id} />
      <RelatedWorks />
    </div>
  )
}

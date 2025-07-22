"use client"

import { FollowList } from "@/components/follow-list"

export default function SeguindoPage({ params }: { params: { username: string } }) {
  return <FollowList username={params.username} type="seguindo" />
}

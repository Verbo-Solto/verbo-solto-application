"use client"

import { FollowList } from "@/components/follow-list"

export default function SeguidoresPage({ params }: { params: { username: string } }) {
  return <FollowList username={params.username} type="seguidores" />
}

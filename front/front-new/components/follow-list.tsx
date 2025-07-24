"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import axios from "axios"

interface UserProfile {
  user: {
    username: string
    first_name: string
  }
  imagem: string
  is_following: boolean
}

interface FollowListProps {
  username: string
  type: "seguidores" | "seguindo"
}

export function FollowList({ username, type }: FollowListProps) {
  const [list, setList] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchList = async () => {
      const token = localStorage.getItem("access")
      if (!token) return
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:8000/api/profile/${username}/${type}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setList(response.data)
      } catch (error) {
        console.error(`Erro ao buscar lista de ${type}`, error)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [username, type])

  const handleFollowToggle = async (targetUsername: string, isFollowing: boolean) => {
    const token = localStorage.getItem("access")
    if (!token) return
    const action = isFollowing ? "deixar-de-seguir" : "seguir"
    try {
      await axios.post(`http://localhost:8000/api/profile/${targetUsername}/${action}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // Atualiza a lista para refletir a mudança
      setList(
        list.map((profile) =>
          profile.user.username === targetUsername
            ? { ...profile, is_following: !isFollowing }
            : profile
        )
      )
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-4 capitalize">{type}</h1>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="space-y-4">
          {list.length > 0 ? (
            list.map((profile) => (
              <Card key={profile.user.username} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={profile.imagem || "/placeholder-user.jpg"} />
                    <AvatarFallback>{profile.user.first_name?.[0] || profile.user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{profile.user.first_name || profile.user.username}</p>
                    <p className="text-sm text-gray-500">@{profile.user.username}</p>
                  </div>
                </div>
                <Button
                  variant={profile.is_following ? "outline" : "default"}
                  onClick={() => handleFollowToggle(profile.user.username, profile.is_following)}
                >
                  {profile.is_following ? "Seguindo" : "Seguir"}
                </Button>
              </Card>
            ))
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
    </div>
  )
}

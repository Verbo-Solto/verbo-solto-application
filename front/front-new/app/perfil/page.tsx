"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Cabecalho } from "@/components/cabecalho"

interface Perfil {
  user: {
    username: string
    email: string
    first_name: string
  }
  bio: string
  cidade: string
  imagem: string
  seguidores: number
  seguindo: number
}

export default function PaginaPerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("access")
      console.log("Token:", token)

      if (!token) {
        setErro("Você precisa estar logado para acessar seu perfil.")
        console.warn("Token JWT não encontrado")
        return
      }

      try {
        const response = await axios.get<Perfil>("http://localhost:8000/api/profiles/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log("Perfil carregado:", response.data)
        setPerfil(response.data)
      } catch (err) {
        console.error("Erro ao buscar perfil", err)
        setErro("Erro ao carregar perfil. Verifique sua autenticação.")
      }
    }

    fetchPerfil()
  }, [])

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} />
      <main className="max-w-4xl mx-auto p-6">
        {erro ? (
          <div className="text-center text-red-600">{erro}</div>
        ) : !perfil ? (
          <div className="text-center text-gray-600">Carregando perfil...</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Perfil</h1>
            <div className="bg-white rounded shadow p-4">
              {perfil.imagem && (
                <img
                  src={`http://localhost:8000${perfil.imagem}`}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              )}
              <p><strong>Usuário:</strong> {perfil.user.username}</p>
              <p><strong>Nome:</strong> {perfil.user.first_name}</p>
              <p><strong>Email:</strong> {perfil.user.email}</p>
              <p><strong>Cidade:</strong> {perfil.cidade}</p>
              <p><strong>Bio:</strong> {perfil.bio}</p>
              <p><strong>Seguidores:</strong> {perfil.seguidores}</p>
              <p><strong>Seguindo:</strong> {perfil.seguindo}</p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

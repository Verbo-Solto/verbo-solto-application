"use client"

import { useState } from "react"
import { Cabecalho } from "@/components/cabecalho"
import { Heroi } from "@/components/heroi"
import { ObrasDestaque } from "@/components/obras-destaque"
import { ModalAutenticacao } from "@/components/modal-autenticacao"
import { Rodape } from "@/components/rodape"

export default function PaginaInicial() {
  const [modalAuth, setModalAuth] = useState<"login" | "cadastro" | null>(null)

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={setModalAuth} />
      <Heroi onAuthClick={setModalAuth} />
      <ObrasDestaque />
      <Rodape />

      {modalAuth && (
        <ModalAutenticacao
          modo={modalAuth}
          onFechar={() => setModalAuth(null)}
          onTrocarModo={(modo) => setModalAuth(modo)}
        />
      )}
    </div>
  )
}

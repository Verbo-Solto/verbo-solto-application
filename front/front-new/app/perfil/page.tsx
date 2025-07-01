"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfacePerfil } from "@/components/interface-perfil"

export default function PaginaPerfil() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} />
      <InterfacePerfil />
    </div>
  )
}

"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfaceEscrita } from "@/components/interface-escrita"

export default function PaginaEscrever() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} estaAutenticado={true} />
      <InterfaceEscrita />
    </div>
  )
}

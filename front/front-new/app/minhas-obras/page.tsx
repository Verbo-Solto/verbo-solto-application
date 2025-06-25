"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfaceMinhasObras } from "@/components/interface-minhas-obras"

export default function PaginaMinhasObras() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} estaAutenticado={true} />
      <InterfaceMinhasObras />
    </div>
  )
}

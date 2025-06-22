"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfaceBiblioteca } from "@/components/interface-biblioteca"

export default function PaginaBiblioteca() {
  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Cabecalho onAuthClick={() => {}} estaAutenticado={true} />
      <InterfaceBiblioteca />
    </div>
  )
}

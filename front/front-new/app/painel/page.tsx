"use client"

import { Cabecalho } from "@/components/cabecalho"
import { DashboardInicial } from "@/components/dashboard-inicial"

export default function PaginaPainel() {
  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Cabecalho onAuthClick={() => {}} estaAutenticado={true} />
      <DashboardInicial />
    </div>
  )
}

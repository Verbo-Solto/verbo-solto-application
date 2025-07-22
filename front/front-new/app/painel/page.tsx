"use client"

import { Cabecalho } from "@/components/cabecalho"
import { DashboardInicial } from "@/components/dashboard-inicial"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { PageLayout } from "@/components/PageLayout"

export default function PaginaPainel() {
  return (
    <ProtectedRoute>
      <PageLayout cabecalhoProps={{ onAuthClick: () => {}, estaAutenticado: true }}>
        <DashboardInicial />
      </PageLayout>
    </ProtectedRoute>
  )
}

"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfaceEscrita } from "@/components/interface-escrita"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { PageLayout } from "@/components/PageLayout"

export default function PaginaEscrever() {
  return (
    <ProtectedRoute>
      <PageLayout cabecalhoProps={{ onAuthClick: () => {}, estaAutenticado: true }}>
        <InterfaceEscrita />
      </PageLayout>
    </ProtectedRoute>
  )
}
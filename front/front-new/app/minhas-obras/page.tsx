"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfaceMinhasObras } from "@/components/interface-minhas-obras"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { PageLayout } from "@/components/PageLayout"

export default function PaginaMinhasObras() {
  return (
    <ProtectedRoute>
      <PageLayout cabecalhoProps={{ onAuthClick: () => {} }}>
        <InterfaceMinhasObras />
      </PageLayout>
    </ProtectedRoute>
  )
}

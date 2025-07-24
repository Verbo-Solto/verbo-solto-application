"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfacePerfil } from "@/components/interface-perfil"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { PageLayout } from "@/components/PageLayout"

export default function PaginaPerfil() {
  return (
    <ProtectedRoute>
      <PageLayout cabecalhoProps={{ onAuthClick: () => {} }}>
        <InterfacePerfil />
      </PageLayout>
    </ProtectedRoute>
  )
}

"use client"

import { Cabecalho } from "@/components/cabecalho"
import { InterfaceBiblioteca } from "@/components/interface-biblioteca"
import { PageLayout } from "@/components/PageLayout"

export default function PaginaBiblioteca() {
  return (
    <PageLayout cabecalhoProps={{ onAuthClick: () => {}, estaAutenticado: true }}>
      <InterfaceBiblioteca />
    </PageLayout>
  )
}

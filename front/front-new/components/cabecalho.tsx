"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu, X, Plus, Bell, User, Settings, LogOut, Library, PenTool } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
import { usePathname } from "next/navigation"

interface CabecalhoProps {
  onAuthClick: (modo: "login" | "cadastro") => void;
  estaAutenticado?: boolean;
}

export function Cabecalho({ onAuthClick, estaAutenticado: propEstaAutenticado }: CabecalhoProps) {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)
  const { usuario, estaAutenticado: authEstaAutenticado, logout } = useAuth()
  const pathname = usePathname();
  const estaAutenticado = propEstaAutenticado ?? authEstaAutenticado

  const navLinks = [
    { href: "/painel", label: "Dashboard" },
    { href: "/minhas-obras", label: "Minhas Obras" },
    { href: "/explorar", label: "Explorar" },
    { href: "/biblioteca", label: "Biblioteca" },
  ];

  return (
    <header className="bg-white border-b border-[#e2e2e2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={estaAutenticado ? "/painel" : "/"} className="flex items-center">
            <Image
              src="/logo-verbo-solto.png"
              alt="Verbo Solto"
              width={150}
              height={40}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-2 bg-[#f8f8f8] rounded-xl px-2 py-1 shadow-sm">
            {estaAutenticado && navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  `px-4 py-2 rounded-lg font-medium transition-all duration-150 ` +
                  (pathname === link.href
                    ? "bg-[#009c3b] text-white shadow-md border border-[#009c3b]"
                    : "text-[#444] hover:bg-[#e6f4ec] hover:text-[#009c3b]")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Barra de Busca */}
          {estaAutenticado && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
                <Input
                  placeholder="Buscar obras, autores, gêneros..."
                  className="pl-10 bg-[#f4f4f4] border-0 focus:bg-white focus:ring-2 focus:ring-[#009c3b]"
                />
              </div>
            </div>
          )}

          {/* Botões de Auth / Menu do Usuário */}
          <div className="hidden md:flex items-center gap-3">
            {!estaAutenticado ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onAuthClick("login")}
                  className="text-[#6e6e6e] hover:text-[#131313]"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => onAuthClick("cadastro")}
                  className="bg-[#009c3b] hover:bg-[#009c3b]/90 text-white"
                >
                  Cadastrar
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/escrever">
                  <Button className="bg-[#131313] text-[#fdfdfd] rounded-[50px] border border-[#131313] px-5 py-3 font-['Montserrat',Helvetica] font-normal text-base tracking-[0.50px] leading-6 hover:bg-[#131313]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Obra
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={usuario?.avatarUrl || "/placeholder.svg?height=32&width=32"} alt={usuario?.nome || "@usuario"} />
                        <AvatarFallback>{usuario?.nome ? usuario.nome.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2) : "US"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{usuario?.nome || "Usuário"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{usuario?.email || "email@exemplo.com"}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/biblioteca" className="cursor-pointer">
                        <Library className="mr-2 h-4 w-4" />
                        <span>Biblioteca</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/minhas-obras" className="cursor-pointer">
                        <PenTool className="mr-2 h-4 w-4" />
                        <span>Minhas Obras</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Botão Menu Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
          >
            {menuMobileAberto ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Menu Mobile */}
        {menuMobileAberto && (
          <div className="md:hidden py-4 border-t border-[#e2e2e2] bg-white shadow-lg rounded-b-xl">
            <div className="space-y-4">
              {estaAutenticado && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
                  <Input placeholder="Buscar..." className="pl-10 bg-[#f4f4f4] border-0" />
                </div>
              )}
              <nav className="flex flex-col space-y-2">
                {estaAutenticado && navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      `px-4 py-2 rounded-lg font-medium transition-all duration-150 ` +
                      (pathname === link.href
                        ? "bg-[#009c3b] text-white shadow-md border border-[#009c3b]"
                        : "text-[#444] hover:bg-[#e6f4ec] hover:text-[#009c3b]")
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 pt-4">
                {estaAutenticado ? (
                  <Link href="/escrever">
                    <Button className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Escrever
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => onAuthClick("login")} className="w-full">
                      Entrar
                    </Button>
                    <Button
                      onClick={() => onAuthClick("cadastro")}
                      className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90"
                    >
                      Cadastrar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

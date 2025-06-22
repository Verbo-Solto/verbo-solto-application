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
import { Search, BookOpen, Menu, X, Plus, Bell, User, Settings, LogOut, Library, PenTool } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  onAuthClick: (mode: "login" | "register") => void
  isAuthenticated?: boolean
}

export function Header({ onAuthClick, isAuthenticated = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#e2e2e2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-[#009c3b]" />
            <span className="text-xl font-bold text-[#131313]">Verbo Solto</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Dashboard
                </Link>
                <Link href="/explore" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Explorar
                </Link>
                <Link href="/library" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Minha Biblioteca
                </Link>
                <Link href="/my-works" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Minhas Obras
                </Link>
              </>
            ) : (
              <>
                <Link href="/explore" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Explorar
                </Link>
                <a href="#" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Gêneros
                </a>
                <a href="#" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Autores
                </a>
                <a href="#" className="text-[#6e6e6e] hover:text-[#131313] transition-colors">
                  Sobre
                </a>
              </>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
              <Input
                placeholder="Buscar obras, autores, gêneros..."
                className="pl-10 bg-[#f4f4f4] border-0 focus:bg-white focus:ring-2 focus:ring-[#009c3b]"
              />
            </div>
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onAuthClick("login")}
                  className="text-[#6e6e6e] hover:text-[#131313]"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => onAuthClick("register")}
                  className="bg-[#009c3b] hover:bg-[#009c3b]/90 text-white"
                >
                  Cadastrar
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/write">
                  <Button className="bg-[#009c3b] hover:bg-[#009c3b]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Escrever
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuario" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">João Silva</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">joao@exemplo.com</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/library" className="cursor-pointer">
                        <Library className="mr-2 h-4 w-4" />
                        <span>Minha Biblioteca</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-works" className="cursor-pointer">
                        <PenTool className="mr-2 h-4 w-4" />
                        <span>Minhas Obras</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#e2e2e2]">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6e6e6e]" />
                <Input placeholder="Buscar..." className="pl-10 bg-[#f4f4f4] border-0" />
              </div>
              <nav className="flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Dashboard
                    </Link>
                    <Link href="/explore" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Explorar
                    </Link>
                    <Link href="/library" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Minha Biblioteca
                    </Link>
                    <Link href="/my-works" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Minhas Obras
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/explore" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Explorar
                    </Link>
                    <a href="#" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Gêneros
                    </a>
                    <a href="#" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Autores
                    </a>
                    <a href="#" className="text-[#6e6e6e] hover:text-[#131313] py-2">
                      Sobre
                    </a>
                  </>
                )}
              </nav>
              <div className="flex flex-col gap-2 pt-4">
                {isAuthenticated ? (
                  <Link href="/write">
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
                      onClick={() => onAuthClick("register")}
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

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { X, Eye, EyeOff, BookOpen } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/useAuth"

interface ModalAutenticacaoProps {
  modo: "login" | "cadastro"
  onFechar: () => void
  onTrocarModo: (modo: "login" | "cadastro") => void
}

export function ModalAutenticacao({ modo, onFechar, onTrocarModo }: ModalAutenticacaoProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    cidade: "",
    biografia: "",
  })
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();

  const cidades = [
    "Fortaleza",
    "Caucaia",
    "Juazeiro do Norte",
    "Maracanaú",
    "Sobral",
    "Crato",
    "Itapipoca",
    "Maranguape",
    "Iguatu",
    "Quixadá",
    "Canindé",
    "Aquiraz",
    "Pacatuba",
    "Crateús",
    "Aracati",
  ]

  const validarEmail = (email: string) => /.+@.+\..+/.test(email);

  // Validações de formulário
  const validarCampos = () => {
    if (!dadosFormulario.email || !dadosFormulario.senha) {
      setErro("Preencha o e-mail e a senha.");
      return false;
    }
    if (!validarEmail(dadosFormulario.email)) {
      setErro("Digite um e-mail válido.");
      return false;
    }
    if (modo === "cadastro") {
      if (!dadosFormulario.nome) {
        setErro("Preencha o nome completo.");
        return false;
      }
      if (dadosFormulario.senha.length < 6) {
        setErro("A senha deve ter pelo menos 6 caracteres.");
        return false;
      }
      if (dadosFormulario.senha !== dadosFormulario.confirmarSenha) {
        setErro("As senhas não coincidem.");
        return false;
      }
      if (!dadosFormulario.cidade) {
        setErro("Selecione sua cidade.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!validarCampos()) return;
    setCarregando(true);
    try {
      if (modo === "login") {
        const resp = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: dadosFormulario.email, password: dadosFormulario.senha })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.detail || "Erro ao fazer login");
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        // Simples: salva o usuário no contexto
        login({ nome: dadosFormulario.email.split("@")[0], email: dadosFormulario.email });
        onFechar();
      } else {
        const resp = await fetch("http://localhost:8000/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: dadosFormulario.email,
            email: dadosFormulario.email,
            password: dadosFormulario.senha,
            full_name: dadosFormulario.nome,
            cidade: dadosFormulario.cidade,
            biografia: dadosFormulario.biografia
          })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || "Erro ao cadastrar");
        // Login automático após cadastro
        const loginResp = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: dadosFormulario.email, password: dadosFormulario.senha })
        });
        const loginData = await loginResp.json();
        if (!loginResp.ok) throw new Error(loginData.detail || "Erro ao fazer login após cadastro");
        localStorage.setItem("access", loginData.access);
        localStorage.setItem("refresh", loginData.refresh);
        login({ nome: dadosFormulario.nome, email: dadosFormulario.email });
        onFechar();
      }
    } catch (err: any) {
      setErro(err.message || "Erro inesperado");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#009c3b]" />
              <h2 className="text-xl font-bold text-[#131313]">{modo === "login" ? "Entrar" : "Criar Conta"}</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onFechar}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Mensagem de Boas-vindas */}
          <div className="mb-6 text-center">
            <p className="text-[#6e6e6e] text-sm">
              {modo === "login"
                ? "Entre na sua conta para continuar lendo e escrevendo"
                : "Crie sua conta e comece a ler e escrever histórias incríveis"}
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {erro && <div className="text-red-600 text-sm mb-2" role="alert">{erro}</div>}
            {modo === "cadastro" && (
              <div>
                <Label htmlFor="nome" className="text-sm font-medium text-[#131313]">
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  type="text"
                  required
                  value={dadosFormulario.nome}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, nome: e.target.value })}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#131313]">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={dadosFormulario.email}
                onChange={(e) => setDadosFormulario({ ...dadosFormulario, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="senha" className="text-sm font-medium text-[#131313]">
                Senha
              </Label>
              <div className="relative mt-1">
                <Input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  required
                  value={dadosFormulario.senha}
                  onChange={(e) => setDadosFormulario({ ...dadosFormulario, senha: e.target.value })}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {modo === "cadastro" && (
              <>
                <div>
                  <Label htmlFor="confirmarSenha" className="text-sm font-medium text-[#131313]">
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    required
                    value={dadosFormulario.confirmarSenha}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, confirmarSenha: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cidade" className="text-sm font-medium text-[#131313]">
                    Cidade (Ceará)
                  </Label>
                  <Select
                    value={dadosFormulario.cidade}
                    onValueChange={(value) => setDadosFormulario({ ...dadosFormulario, cidade: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione sua cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cidades.map((cidade) => (
                        <SelectItem key={cidade} value={cidade}>
                          {cidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="biografia" className="text-sm font-medium text-[#131313]">
                    Sobre você (opcional)
                  </Label>
                  <Textarea
                    id="biografia"
                    placeholder="Conte um pouco sobre você, seus interesses literários..."
                    value={dadosFormulario.biografia}
                    onChange={(e) => setDadosFormulario({ ...dadosFormulario, biografia: e.target.value })}
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-[#009c3b] hover:bg-[#009c3b]/90 text-white" disabled={carregando}>
              {carregando ? (modo === "login" ? "Entrando..." : "Cadastrando...") : (modo === "login" ? "Entrar" : "Criar Conta")}
            </Button>
          </form>

          {/* Trocar Modo */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#6e6e6e]">
              {modo === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
              <Button
                variant="link"
                className="text-[#009c3b] hover:text-[#009c3b]/80 p-0 ml-1"
                onClick={() => onTrocarModo(modo === "login" ? "cadastro" : "login")}
              >
                {modo === "login" ? "Cadastre-se" : "Faça login"}
              </Button>
            </p>
          </div>

          {/* Esqueceu a Senha (apenas para login) */}
          {modo === "login" && (
            <div className="mt-4 text-center">
              <Button variant="link" className="text-sm text-[#6e6e6e] hover:text-[#009c3b]">
                Esqueceu sua senha?
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

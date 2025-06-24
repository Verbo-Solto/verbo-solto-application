"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface Usuario {
  nome: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Recupera usuário do localStorage se existir
    const userStr = localStorage.getItem("usuario");
    if (userStr) setUsuario(JSON.parse(userStr));
  }, []);

  const login = (user: Usuario) => {
    setUsuario(user);
    localStorage.setItem("usuario", JSON.stringify(user));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado: !!usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}

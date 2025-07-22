"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { estaAutenticado } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!estaAutenticado) {
      router.push("/");
    }
  }, [estaAutenticado, router]);

  if (!estaAutenticado) return null;
  return <>{children}</>;
} 
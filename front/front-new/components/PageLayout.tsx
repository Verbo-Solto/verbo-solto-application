import { ReactNode } from "react";
import { Cabecalho } from "@/components/cabecalho";
import { Rodape } from "@/components/rodape";

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  cabecalhoProps?: React.ComponentProps<typeof Cabecalho>;
  className?: string;
}

export function PageLayout({
  children,
  showFooter = false,
  cabecalhoProps = {
    onAuthClick: () => alert('Ação de autenticação não definida!'),
  },
  className = "",
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-[#fefefe] flex flex-col ${className}`}>
      <Cabecalho {...cabecalhoProps} />
      <main className="flex-1">{children}</main>
      {showFooter && <Rodape />}
    </div>
  );
} 
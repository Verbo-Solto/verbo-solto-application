export interface Obra {
  id: number;
  titulo: string;
  capa: string;
  autor: {
    username: string;
  };
  genero: string;
  cidade: string;
  tags: string[];
  resumo: string;
  curtidas: number;
  visualizacoes: number;
  comentarios: number;
  avaliacao_media: number;
  publicada_em: string;
  // Adicione outros campos conforme necessário
  dataPublicacao: string;
  tempoLeitura: string;
}

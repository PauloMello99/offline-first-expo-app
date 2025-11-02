/**
 * Dados mock para blogs
 * Usado quando Supabase não está configurado ou falha
 */

export const MOCK_BLOGS = [
  {
    id: "1",
    title: "Bem-vindo ao Mundo React Native",
    content:
      "React Native é uma das tecnologias mais empolgantes para desenvolvimento mobile atualmente.\n\nNos últimos anos, a comunidade tem crescido exponencialmente, e as ferramentas disponíveis tornaram o desenvolvimento ainda mais produtivo.\n\nNeste post, vamos explorar os fundamentos do React Native e como você pode começar a criar apps incríveis já hoje.",
    author: "Maria Silva",
    authorEmail: "maria@exemplo.com",
    publishedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 dias atrás
    excerpt: "Uma introdução completa ao React Native para iniciantes",
    coverImage: undefined,
  },
  {
    id: "2",
    title: "Offline-First: O Futuro dos Apps Mobile",
    content:
      "Apps offline-first não são mais uma tendência - são uma necessidade.\n\nHoje, usuários esperam que apps funcionem perfeitamente mesmo sem conexão com a internet. WatermelonDB é uma das soluções mais elegantes para criar apps verdadeiramente offline-first.\n\nVamos mergulhar em como implementar sincronização robusta e garantir a melhor experiência possível para seus usuários, mesmo em ambientes com conectividade limitada.",
    author: "João Santos",
    authorEmail: "joao@exemplo.com",
    publishedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 dias atrás
    excerpt: "Como criar apps que funcionam offline perfeitamente",
    coverImage: undefined,
  },
  {
    id: "3",
    title: "WatermelonDB vs SQLite: Comparação Prática",
    content:
      "Quando se trata de persistência local em React Native, desenvolvedores frequentemente se perguntam: WatermelonDB ou SQLite direto?\n\nAmbos têm seus prós e contras. SQLite oferece máximo controle e performance, enquanto WatermelonDB traz observability reativa e abstrações poderosas.\n\nVamos analisar casos de uso reais e quando cada abordagem faz mais sentido.",
    author: "Ana Costa",
    authorEmail: "ana@exemplo.com",
    publishedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 dias atrás
    excerpt: "Análise detalhada de soluções de persistência local",
    coverImage: undefined,
  },
  {
    id: "4",
    title: "Supabase + React Native: Backend Sem Esforço",
    content:
      "Supabase está revolucionando como desenvolvedores constroem backends para apps mobile.\n\nCom APIs auto-geradas, auth integrado, e real-time subscriptions, Supabase elimina a necessidade de criar e manter servidores complexos.\n\nNeste guia, vamos configurar Supabase em um app React Native e ver como integrar com WatermelonDB para sincronização bidirecional.",
    author: "Pedro Oliveira",
    authorEmail: "pedro@exemplo.com",
    publishedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 dias atrás
    excerpt: "Configure um backend completo em minutos",
    coverImage: undefined,
  },
  {
    id: "5",
    title: "TypeScript em React Native: Por Onde Começar",
    content:
      "TypeScript não é mais opcional no desenvolvimento React Native moderno.\n\nType safety, IntelliSense melhorado, e documentação auto-gerada tornam TypeScript uma escolha óbvia para projetos sérios.\n\nMas configurar TypeScript corretamente no React Native pode ser desafiador. Vamos ver as melhores práticas e configurações recomendadas.",
    author: "Camila Lima",
    authorEmail: "camila@exemplo.com",
    publishedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 dia atrás
    excerpt: "Configure TypeScript no seu app React Native",
    coverImage: undefined,
  },
  {
    id: "6",
    title: "Estados Globais com Context API",
    content:
      "Context API é poderosa, mas usá-la para estados globais complexos pode levar a problemas de performance.\n\nVamos discutir quando usar Context, quando usar soluções como Redux ou Zustand, e como estruturar estados globais de forma eficiente.\n\nBoas práticas e armadilhas comuns serão cobertas neste post.",
    author: "Ricardo Silva",
    authorEmail: "ricardo@exemplo.com",
    publishedAt: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 dias atrás
    excerpt: "Gerencie estados globais de forma eficiente",
    coverImage: undefined,
  },
  {
    id: "7",
    title: "Testing em React Native: Guia Completo",
    content:
      "Testing é crucial para manter qualidade em apps mobile.\n\nReact Native oferece várias ferramentas: Jest, React Native Testing Library, Detox para E2E, e muito mais.\n\nVamos construir uma estratégia de testes abrangente e ver exemplos práticos de unit, integration e E2E tests.",
    author: "Fernanda Rocha",
    authorEmail: "fernanda@exemplo.com",
    publishedAt: Date.now() - 6 * 24 * 60 * 60 * 1000, // 6 dias atrás
    excerpt: "Estratégia completa de testes para React Native",
    coverImage: undefined,
  },
  {
    id: "8",
    title: "Deploy e CI/CD para React Native",
    content:
      "Publicar apps para App Store e Google Play manualmente é um pesadelo.\n\nCom pipelines CI/CD adequados, você pode automatizar builds, testes, e deploys para ambos os stores.\n\nVamos configurar GitHub Actions para automatizar todo o processo de release.",
    author: "Carlos Mendes",
    authorEmail: "carlos@exemplo.com",
    publishedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 dias atrás
    excerpt: "Automatize seus deploys com GitHub Actions",
    coverImage: undefined,
  },
];


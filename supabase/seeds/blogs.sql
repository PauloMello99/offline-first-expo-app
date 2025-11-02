
INSERT INTO blogs (title, content, author, author_email, published_at, excerpt)
VALUES
  (
    'Bem-vindo ao Mundo React Native',
    E'React Native é uma das tecnologias mais empolgantes para desenvolvimento mobile atualmente.\n\nNos últimos anos, a comunidade tem crescido exponencialmente, e as ferramentas disponíveis tornaram o desenvolvimento ainda mais produtivo.\n\nNeste post, vamos explorar os fundamentos do React Native e como você pode começar a criar apps incríveis já hoje.',
    'Maria Silva',
    'maria@exemplo.com',
    NOW() - INTERVAL '7 days',
    'Uma introdução completa ao React Native para iniciantes'
  ),
  (
    'Offline-First: O Futuro dos Apps Mobile',
    E'Apps offline-first não são mais uma tendência - são uma necessidade.\n\nHoje, usuários esperam que apps funcionem perfeitamente mesmo sem conexão com a internet. WatermelonDB é uma das soluções mais elegantes para criar apps verdadeiramente offline-first.\n\nVamos mergulhar em como implementar sincronização robusta e garantir a melhor experiência possível para seus usuários, mesmo em ambientes com conectividade limitada.',
    'João Santos',
    'joao@exemplo.com',
    NOW() - INTERVAL '5 days',
    'Como criar apps que funcionam offline perfeitamente'
  ),
  (
    'WatermelonDB vs SQLite: Comparação Prática',
    E'Quando se trata de persistência local em React Native, desenvolvedores frequentemente se perguntam: WatermelonDB ou SQLite direto?\n\nAmbos têm seus prós e contras. SQLite oferece máximo controle e performance, enquanto WatermelonDB traz observability reativa e abstrações poderosas.\n\nVamos analisar casos de uso reais e quando cada abordagem faz mais sentido.',
    'Ana Costa',
    'ana@exemplo.com',
    NOW() - INTERVAL '3 days',
    'Análise detalhada de soluções de persistência local'
  ),
  (
    'Supabase + React Native: Backend Sem Esforço',
    E'Supabase está revolucionando como desenvolvedores constroem backends para apps mobile.\n\nCom APIs auto-geradas, auth integrado, e real-time subscriptions, Supabase elimina a necessidade de criar e manter servidores complexos.\n\nNeste guia, vamos configurar Supabase em um app React Native e ver como integrar com WatermelonDB para sincronização bidirecional.',
    'Pedro Oliveira',
    'pedro@exemplo.com',
    NOW() - INTERVAL '2 days',
    'Configure um backend completo em minutos'
  ),
  (
    'TypeScript em React Native: Por Onde Começar',
    E'TypeScript não é mais opcional no desenvolvimento React Native moderno.\n\nType safety, IntelliSense melhorado, e documentação auto-gerada tornam TypeScript uma escolha óbvia para projetos sérios.\n\nMas configurar TypeScript corretamente no React Native pode ser desafiador. Vamos ver as melhores práticas e configurações recomendadas.',
    'Camila Lima',
    'camila@exemplo.com',
    NOW() - INTERVAL '1 day',
    'Configure TypeScript no seu app React Native'
  ),
  (
    'Estados Globais com Context API',
    E'Context API é poderosa, mas usá-la para estados globais complexos pode levar a problemas de performance.\n\nVamos discutir quando usar Context, quando usar soluções como Redux ou Zustand, e como estruturar estados globais de forma eficiente.\n\nBoas práticas e armadilhas comuns serão cobertas neste post.',
    'Ricardo Silva',
    'ricardo@exemplo.com',
    NOW() - INTERVAL '4 days',
    'Gerencie estados globais de forma eficiente'
  ),
  (
    'Testing em React Native: Guia Completo',
    E'Testing é crucial para manter qualidade em apps mobile.\n\nReact Native oferece várias ferramentas: Jest, React Native Testing Library, Detox para E2E, e muito mais.\n\nVamos construir uma estratégia de testes abrangente e ver exemplos práticos de unit, integration e E2E tests.',
    'Fernanda Rocha',
    'fernanda@exemplo.com',
    NOW() - INTERVAL '6 days',
    'Estratégia completa de testes para React Native'
  ),
  (
    'Deploy e CI/CD para React Native',
    E'Publicar apps para App Store e Google Play manualmente é um pesadelo.\n\nCom pipelines CI/CD adequados, você pode automatizar builds, testes, e deploys para ambos os stores.\n\nVamos configurar GitHub Actions para automatizar todo o processo de release.',
    'Carlos Mendes',
    'carlos@exemplo.com',
    NOW() - INTERVAL '10 days',
    'Automatize seus deploys com GitHub Actions'
  );

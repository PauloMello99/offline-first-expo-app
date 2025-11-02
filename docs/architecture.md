# Arquitetura Offline-First

## Visão Geral

Este projeto implementa uma arquitetura offline-first, onde o app funciona completamente offline e sincroniza com o backend quando há conexão.

## Componentes Principais

### 1. WatermelonDB (Persistência Local)

- **Local SQLite Database**
- **Observable Queries** - React automaticamente re-renderiza quando dados mudam
- **JSI Mode** - Performance nativa em Expo
- **Schema Versioning** - Migrações automáticas

```typescript
// db/index.ts
const database = new Database({
  adapter: adapter,
  modelClasses: [Blog],
});
```

### 2. Supabase (Backend)

- **PostgreSQL Database** - Backend confiável
- **REST API** - Auto-gerada
- **Row Level Security** - Controle de acesso
- **Realtime** - (Opcional para futuras features)

### 3. Sync Service

Gerencia sincronização bidirecional:

```typescript
// lib/sync/syncService.ts
SyncService.pullFromSupabase()  // Baixa do Supabase
SyncService.pushToSupabase()    // Envia para Supabase
SyncService.fullSync()          // Sincronização completa
```

## Fluxo de Dados

### Primeira Abertura do App

```
1. App inicia
2. useSync() executa
3. Tenta pullFromSupabase()
   ├─ Sucesso → Salva no WatermelonDB
   └─ Falha → Usa seedMockData()
4. Dados carregados localmente
5. UI renderiza com dados do WatermelonDB
```

### Modo Offline

```
1. Usuário abre app sem internet
2. Dados carregados do WatermelonDB local
3. App funciona normalmente
4. Mudanças ficam pendentes localmente
5. Quando online → sync automático
```

### Atualização de Dados

```
1. User interage com UI
2. WatermelonDB Observable dispara
3. Componente re-renderiza
4. UI sempre sincronizada com DB
```

## Vantagens da Arquitetura

### ✅ Performance
- **Instantâneo** - Dados sempre locais
- **Não depende de rede** - Sem loading states em navegação
- **Observables** - Atualizações reativas automáticas

### ✅ Confiabilidade
- **Funciona offline** - Conexão não necessária
- **Resiliente** - Fallback para dados mock
- **Consistente** - Única fonte de verdade local

### ✅ Experiência do Usuário
- **Sem delays** - Navegação instantânea
- **Sempre funciona** - Mesmo sem internet
- **Responsivo** - UI reage imediatamente

## Comparação com Outras Abordagens

### ❌ Fetch Direto da API

```typescript
// ❌ Ruim - Demora, não funciona offline
const blogs = await fetch('/api/blogs').then(r => r.json());
```

**Problemas:**
- Loading states em toda navegação
- Não funciona offline
- Consome data mobile desnecessariamente
- Lento em conexões ruins

### ✅ Offline-First com WatermelonDB

```typescript
// ✅ Bom - Rápido, funciona offline
const blogs = await database.collections.get('blogs').query().fetch();
```

**Benefícios:**
- Instantâneo
- Offline-first
- Observables reativos
- Sync inteligente

## Padrões de Sincronização

### Pull (Baixar)

```typescript
// Busca dados do Supabase e salva localmente
await SyncService.pullFromSupabase();
```

**Quando usar:**
- Ao abrir o app
- Em pull-to-refresh
- Em background sync

### Push (Enviar)

```typescript
// Envia mudanças locais para o Supabase
await SyncService.pushToSupabase();
```

**Quando usar:**
- Após criar/editar/deletar
- Em sync background
- Antes de fechar app

### Bidirecional

```typescript
// Pull + Push
await SyncService.fullSync();
```

**Quando usar:**
- Sync completo
- Resolver conflitos
- Force refresh

## Estratégias de Cache

### Cache First

```
1. Buscar local
2. Se não encontrar → buscar remoto
3. Salvar localmente
```

### Network First

```
1. Tentar buscar remoto
2. Se falhar → buscar local
3. Tentar background sync
```

### Stale While Revalidate

```
1. Mostrar dados locais imediatamente
2. Buscar atualizações em background
3. Atualizar se houver mudanças
```

## Resolução de Conflitos

### Last Write Wins (Atual)

```typescript
// Última modificação vence
if (remote.updated_at > local.updated_at) {
  // Usar remote
} else {
  // Manter local
}
```

### Merge Intelligence (Futuro)

```typescript
// Merge inteligente de campos
if (remote.title !== local.title) {
  // Conflito detectado
  // Pedir ao usuário
}
```

## Observables

WatermelonDB fornece observables reativos:

```typescript
// Componente re-renderiza automaticamente quando dados mudam
const blogs = useObservable(() => 
  database.collections.get('blogs').query()
);
```

**Benefícios:**
- UI sempre sincronizada
- Menos código manual
- Performance otimizada

## Performance

### Benchmarks Esperados

- **Query local**: < 1ms
- **Query remota**: 200-1000ms
- **Sync completo**: 500-2000ms
- **Render com observables**: Instantâneo

### Otimizações

1. **Paginação** - Carregar apenas necessário
2. **Lazy loading** - Carregar sob demanda
3. **Background sync** - Não bloquear UI
4. **Cache inteligente** - Evitar refetchs

## Segurança

### Dados Locais

- Criptografados (SQLCipher opcional)
- Isolados por app
- Backups automáticos do sistema

### Sincronização

- HTTPS sempre
- Tokens JWT
- Row Level Security
- Validação server-side

## Monitoramento

### Métricas Importantes

- Tamanho do DB local
- Tempo de sync
- Taxa de sucesso/falha
- Conflitos detectados

### Logs

```typescript
console.log('Sync started');
console.log('Local records:', localCount);
console.log('Remote records:', remoteCount);
console.log('Changes applied:', changesCount);
```

## Escalabilidade

### Limitações Atuais

- Tabela única (blogs)
- Sync simples (pull only)
- Sem autenticação

### Próximas Melhorias

- Múltiplas tabelas
- Relações complexas
- Multi-user sync
- Otimistic updates

## Recursos

- [WatermelonDB Sync](https://watermelondb.dev/docs/Sync)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Offline Patterns](https://web.dev/offline-cookbook/)


# Configuração do Supabase

## 1. Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Crie uma conta ou faça login
3. Crie um novo projeto

## 2. Aplicar Migrations

### Opção A: Via Supabase CLI (Recomendado)

Se você tem o Supabase CLI instalado localmente:

```bash
# Iniciar Supabase localmente
supabase start

# Aplicar migrations
supabase db push

# Ver status
supabase status
```

### Opção B: Via SQL Editor

No SQL Editor do Supabase Dashboard, execute o conteúdo do arquivo:
`supabase/migrations/20240101000000_create_blogs_table.sql`

Ou execute diretamente:

```sql
-- Ver o conteúdo completo em: supabase/migrations/20240101000000_create_blogs_table.sql

-- Este migration cria:
-- 1. Tabela blogs com todos os campos necessários
-- 2. Índices para performance (published_at, author_email)
-- 3. Row Level Security (RLS) habilitado
-- 4. Policies para leitura pública e escrita autenticada
-- 5. Trigger para atualizar updated_at automaticamente
-- 6. 8 blogs de exemplo pré-preenchidos
```

## 3. Obter Credenciais

1. Vá para Settings → API
2. Copie:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**

## 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

## 5. Testar

1. Inicie o app: `pnpm dev`
2. O app deve sincronizar os dados do Supabase automaticamente
3. Verifique os logs no console

## Troubleshooting

### "Error fetching blogs from Supabase"
- Verifique se as variáveis de ambiente estão configuradas corretamente
- Confirme que RLS permite leitura pública
- Verifique se a tabela existe no banco

### "No blogs found"
- Execute os INSERTs de exemplo
- Verifique se `published_at` está no formato correto
- Confirme que a tabela não está vazia

### Dados não aparecem
- Limpe o cache do app
- Force refresh
- Verifique logs no console

## Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar push de mudanças
- [ ] Adicionar filtros de busca
- [ ] Implementar cache inteligente


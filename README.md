# CRM de Vendas — Back-end

> 🚧 **Em desenvolvimento** — fase atual: levantamento de requisitos e decisões de arquitetura.

API de um CRM para empresas de **venda de serviços**. Os leads capturados pelo site da empresa entram automaticamente no funil de vendas, onde vendedores, gerentes e administradores acompanham todo o ciclo comercial, da proposta à venda.

O cenário de demonstração é uma empresa fictícia de **consórcios**.

## O problema

- Leads que chegam pelo site se perdem em e-mails e planilhas, sem responsável definido.
- Vendedores não têm visão consolidada das próprias propostas e vendas.
- Gestores não acompanham o desempenho da equipe sem compilar relatórios manualmente.

## Funcionalidades do MVP

- **Site público:** catálogo de serviços e formulário de interesse que gera leads.
- **Pool de leads:** vendedores reivindicam leads; gerentes atribuem e reatribuem.
- **Clientes:** cadastro com controle de responsável e prevenção de duplicidade.
- **Propostas e vendas:** ciclo de vida com status (rascunho → enviada → em negociação → ganha/perdida).
- **Dashboard:** métricas de vendas no escopo de cada perfil (próprias, da equipe ou de todos).
- **Controle de acesso:** perfis hierárquicos (vendedor, gerente, administrador) com escopo de dados.

## Stack

| Camada | Tecnologia |
|---|---|
| Linguagem / runtime | TypeScript, Node.js |
| Framework HTTP | Express 5 |
| Banco de dados | PostgreSQL 17 |
| ORM | Prisma 8 *(release candidate — ADR pendente)* |
| Validação | Zod |
| Infraestrutura local | Docker Compose |
| Qualidade | ESLint, Prettier |

## Documentação

| Documento | Conteúdo |
|---|---|
| [Levantamento de requisitos](docs/requirements.md) | Visão, perfis e permissões, requisitos funcionais e não funcionais, regras de negócio e critérios de aceitação |
| [Decisões de arquitetura (ADRs)](docs/adr/README.md) | Registro das decisões técnicas e seus trade-offs |

## Como rodar localmente

**Pré-requisitos:** Node.js, Docker e Docker Compose.

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Subir o banco de dados
docker compose up -d

# 4. Iniciar a API em modo de desenvolvimento
npm run dev
```

### Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia a API com recarregamento automático |
| `npm run build` | Compila para produção em `dist/` |
| `npm start` | Executa a versão compilada |
| `npm run typecheck` | Verifica os tipos sem gerar arquivos |
| `npm run lint` | Executa o ESLint |
| `npm run format` | Formata o código com o Prettier |

## Roadmap

- [ ] **Fase 1 — Requisitos:** visão, perfis, requisitos e critérios de aceitação do MVP
- [ ] **Fase 2 — Arquitetura:** ADRs das decisões principais e modelagem do banco
- [ ] **Fase 3 — Backlog:** issues e milestones no GitHub, rastreáveis aos requisitos
- [ ] **Fase 4 — MVP:** implementação, testes, deploy e vídeos demonstrando cada critério de aceitação

## Autor

**Pablo Henrique Ferreira de França** — [GitHub](https://github.com/devpabloh)

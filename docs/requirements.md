# Levantamento de Requisitos

> Documento vivo. Última revisão: 2026-10-18.
> Itens marcados com **[MVP]** fazem parte da primeira entrega. Os demais compõem o backlog.

## Sumário

1. [Visão do sistema](#1-visão-do-sistema)
2. [Perfis de usuário](#2-perfis-de-usuário)
3. [Requisitos funcionais](#3-requisitos-funcionais)
4. [Regras de negócio](#4-regras-de-negócio)
5. [Requisitos não funcionais](#5-requisitos-não-funcionais)
6. [Critérios de aceitação](#6-critérios-de-aceitação)
7. [Glossário](#7-glossário)
8. [Questões em aberto](#8-questões-em-aberto)

---

## 1. Visão do sistema

### Objetivo

Permitir que empresas de venda de serviços capturem leads pelo próprio site e gerenciem todo o ciclo comercial, da proposta à venda, com visibilidade por vendedor e por equipe.

### Problemas que o sistema resolve

- Leads que chegam pelo site se perdem em e-mails e planilhas, sem um responsável definido.
- Os vendedores não têm uma visão consolidada das próprias propostas e vendas.
- Os gestores não conseguem acompanhar o desempenho da equipe sem compilar relatórios manualmente.
- Não há rastreabilidade de quem alterou o quê, o que gera conflitos internos (por exemplo, disputa por clientes).

### Escopo

**Dentro do escopo:**

- Site público com catálogo de serviços e formulário de interesse que gera leads.
- Área logada (CRM) com gestão de clientes, propostas e vendas, dashboards e gestão de usuários e serviços.
- Controle de acesso por papel (RBAC) e por escopo de dados (próprios, da equipe ou todos).
- Log de auditoria das ações relevantes.

**Fora do escopo (por enquanto):**

- Regras específicas de consórcio (grupos, cotas, contemplação, lances). O consórcio é usado apenas como **cenário de demonstração**.
- Vários clientes compartilhando a mesma instalação (multi-tenant). Ver [ADR-0001](adr/0001-single-tenant.md).
- Pipelines de venda configuráveis. No MVP, os status da proposta são fixos.
- Integrações externas (WhatsApp, e-mail marketing, ERP).

### Modelo de implantação

Uma instância (deploy + banco) por empresa cliente. Ver [ADR-0001](adr/0001-single-tenant.md).

---

## 2. Perfis de usuário

Os papéis são **hierárquicos**: cada papel herda as permissões do anterior.

| Perfil | Descrição |
|---|---|
| **Visitante** | Usuário anônimo do site público. Não possui conta. |
| **Vendedor** | Atende leads, gerencia os próprios clientes e propostas. Pertence a um gerente. |
| **Gerente** | Acompanha e gerencia a própria equipe de vendedores, o catálogo de serviços e o pool de leads. |
| **Administrador** | Acesso total ao sistema, incluindo a gestão de gerentes. |

### Matriz de permissões

Legenda: ✅ permitido · 👤 apenas os próprios · 👥 apenas da sua equipe · 🔎 visualização resumida · ❌ negado

| Funcionalidade | Visitante | Vendedor | Gerente | Admin |
|---|:-:|:-:|:-:|:-:|
| Ver catálogo de serviços | ✅ | ✅ | ✅ | ✅ |
| Enviar formulário de interesse | ✅ | — | — | — |
| Ver pool de leads sem dono | ❌ | ✅ | ✅ | ✅ |
| Reivindicar lead do pool | ❌ | ✅ | — | — |
| Atribuir / reatribuir lead | ❌ | ❌ | 👥 | ✅ |
| Visualizar clientes | ❌ | 👤 completo · 🔎 demais | ✅ | ✅ |
| Criar cliente | ❌ | ✅ | ✅ | ✅ |
| Editar cliente | ❌ | 👤 | ✅ | ✅ |
| Criar / editar propostas | ❌ | 👤 | 👥 | ✅ |
| Cancelar venda | ❌ | ❌ | 👥 | ✅ |
| Dashboard de vendas | ❌ | 👤 | 👥 | ✅ |
| Gerenciar catálogo de serviços | ❌ | ❌ | ✅ | ✅ |
| Gerenciar vendedores | ❌ | ❌ | 👥 | ✅ |
| Gerenciar gerentes | ❌ | ❌ | ❌ | ✅ |
| Consultar log de auditoria | ❌ | ❌ | 👥 | ✅ |

---

## 3. Requisitos funcionais

### Público

- **RF-001** **[MVP]** Listar os serviços ativos do catálogo.
- **RF-002** Visualizar os detalhes de um serviço.
- **RF-003** **[MVP]** Enviar formulário de interesse, gerando um lead sem responsável.

### Autenticação

- **RF-004** **[MVP]** Autenticar com e-mail e senha.
- **RF-005** Recuperar senha.

### Clientes e leads

- **RF-006** **[MVP]** Cadastrar, listar, visualizar e editar clientes, respeitando o escopo do usuário.
- **RF-007** **[MVP]** Atribuir ou reatribuir um lead a um vendedor (gerente/admin).
- **RF-018** **[MVP]** Listar o pool de leads sem responsável.
- **RF-019** **[MVP]** Reivindicar um lead do pool (vendedor).
- **RF-020** Configurar a estratégia de distribuição de leads: manual/pool ou rodízio (admin). Ver [ADR-0003](adr/0003-distribuicao-de-leads.md).

### Propostas e vendas

- **RF-008** **[MVP]** Criar uma proposta vinculada a um cliente e a um ou mais serviços.
- **RF-009** **[MVP]** Alterar o status da proposta, respeitando as transições permitidas.
- **RF-010** Cancelar uma venda, informando o motivo (gerente/admin).
- **RF-021** Cliente aceita, recusa ou solicita ajustes na proposta por meio de um link seguro, sem login.
- **RF-022** Notificar o vendedor quando o cliente responder à proposta.

> No MVP, as alterações de status são feitas **manualmente** pelo vendedor (RF-009). O aceite online pelo cliente (RF-021) e as notificações (RF-022) ficam para depois do MVP, por exigirem acesso externo seguro e um mecanismo de notificações.

### Dashboard e relatórios

- **RF-011** **[MVP]** Exibir métricas de vendas no escopo do usuário (próprias, da equipe ou de todos).
- **RF-012** Filtrar métricas por vendedor, status e por período.
- **RF-013** Exportar relatório (CSV/PDF).

### Gestão

- **RF-014** **[MVP]** Gerenciar o catálogo de serviços (criar, listar, editar, ativar/desativar).
- **RF-015** **[MVP]** Gerenciar usuários respeitando a hierarquia de papéis.
- **RF-016** Registrar as ações relevantes em log de auditoria.
- **RF-017** Consultar o log de auditoria.

> A numeração não é reordenada quando requisitos são adicionados. RF-018 em diante surgiram depois e mantêm números novos para não quebrar referências em issues e testes.

---

## 4. Regras de negócio

### Acesso e hierarquia

- **RN-001** O vendedor só edita clientes e propostas atribuídos a ele.
- **RN-002** Um usuário só cria ou gerencia usuários de papel **inferior** ao seu (gerente → vendedor; admin → gerente e vendedor).
- **RN-011** Todo vendedor pertence a exatamente um gerente. O gerente enxerga apenas os dados da própria equipe.
- **RN-010** O vendedor visualiza qualquer cliente de forma **resumida** (nome e responsável), mas acessa os dados completos apenas dos próprios.

### Propostas e vendas

- **RN-003** Proposta com status `GANHA` não pode ser excluída, apenas passar para `CANCELADA` (com motivo e registro em auditoria). Somente gerente ou admin podem cancelar.
- **RN-004** A proposta armazena o preço de cada serviço no momento da criação (snapshot), sem ser afetada por alterações posteriores no catálogo.
- **RN-005** Serviço inativo não aparece no catálogo público, mas continua visível nas propostas que já o referenciam.
- **RN-012** Ciclo de vida da proposta:

  ```
  RASCUNHO → ENVIADA ⇄ EM_NEGOCIACAO
                │            │
                ├────────────┼──→ GANHA (= venda) → CANCELADA
                └────────────┴──→ PERDIDA
  ```

  Transições permitidas (qualquer outra é rejeitada):

  | De ↓ / Para → | `ENVIADA` | `EM_NEGOCIACAO` | `GANHA` | `PERDIDA` | `CANCELADA` |
  |---|:-:|:-:|:-:|:-:|:-:|
  | `RASCUNHO` | ✅ | ❌ | ❌ | ❌ | ❌ |
  | `ENVIADA` | — | ✅ | ✅ | ✅ | ❌ |
  | `EM_NEGOCIACAO` | ✅ | — | ✅ | ✅ | ❌ |
  | `GANHA` | ❌ | ❌ | — | ❌ | ✅ *(gerente/admin, pós-MVP)* |
  | `PERDIDA` | ❌ | ❌ | ❌ | — | ❌ |
  | `CANCELADA` | ❌ | ❌ | ❌ | ❌ | — |

  - `EM_NEGOCIACAO → ENVIADA`: o cliente pediu ajustes; o vendedor edita e reenvia a proposta.
  - `GANHA`, `PERDIDA` e `CANCELADA` são estados finais (exceto o cancelamento de uma venda). Se o cliente voltar a negociar, cria-se uma nova proposta.
  - Os status são identificadores de código e não usam acentos ou cedilha.

- **RN-014** Ao passar para `GANHA` ou `PERDIDA`, a proposta registra a data de fechamento (`closedAt`).
- **RN-015** Ao passar para `PERDIDA`, é obrigatório informar o motivo da perda.
- **RN-016** Apenas propostas em `RASCUNHO` podem ser excluídas. Nos demais status, a proposta é mantida para preservar o histórico e as métricas.

### Leads

- **RN-006** Lead sem responsável fica visível no pool para todos os vendedores e gerentes.
- **RN-007** Um vendedor pode ter no máximo **3** leads em aberto ainda não trabalhados. Um lead é considerado **trabalhado** quando o vendedor cria a primeira proposta para ele.
- **RN-008** O gerente pode atribuir ou reatribuir leads do pool ou da própria equipe, sobrepondo a reivindicação.
- **RN-009** *(pós-MVP)* Lead reivindicado que não for trabalhado (RN-007) em até 24 horas corridas retorna ao pool.
- **RN-013** Não podem existir dois clientes com o mesmo CPF/CNPJ ou e-mail. Ao tentar cadastrar um duplicado, o sistema informa quem é o responsável atual.

---

## 5. Requisitos não funcionais

- **RNF-001** **[MVP]** Rotas privadas protegidas por autenticação (JWT).
- **RNF-002** **[MVP]** Senhas armazenadas com hash forte (argon2 ou bcrypt).
- **RNF-003** **[MVP]** Endpoint público de leads com *rate limiting* e validação de entrada.
- **RNF-004** **[MVP]** Coleta de dados pessoais com consentimento explícito (LGPD) e minimização dos dados expostos por perfil.
- **RNF-005** **[MVP]** Operações concorrentes sobre o mesmo lead (reivindicação/atribuição) devem ser atômicas: apenas uma pode ter sucesso.
- **RNF-006** **[MVP]** Respostas de erro padronizadas, sem vazar detalhes internos (stack trace, SQL).
- **RNF-007** Validação de variáveis de ambiente na inicialização (*fail fast*).

---

## 6. Critérios de aceitação

Formato: **Dado** (contexto) / **Quando** (ação) / **Então** (resultado verificável). Cada critério deve virar ao menos um teste automatizado.

### RF-003 — Enviar formulário de interesse

- **CA-001** Dado um visitante que preencheu nome, e-mail, telefone e marcou o consentimento LGPD, quando ele enviar o formulário, então um lead é criado sem responsável e a resposta é `201 Created`.
- **CA-002** Dado um formulário sem o consentimento marcado, quando ele for enviado, então o sistema responde `400 Bad Request` e nada é persistido.
- **CA-003** Dado um mesmo IP que enviou 5 formulários no último minuto, quando ele enviar o 6º, então o sistema responde `429 Too Many Requests`.

### RF-006 — Editar cliente

- **CA-006** Dado um vendedor autenticado, quando ele editar um cliente atribuído a ele, então os dados são atualizados.
- **CA-007** Dado um vendedor autenticado, quando ele tentar editar um cliente de outro vendedor, então o sistema responde `403 Forbidden` e nada é alterado.

### RF-007 — Atribuir lead a vendedor

- **CA-004** Dado um gerente autenticado e um lead sem responsável, quando ele atribuir o lead a um vendedor da sua equipe, então o lead passa a pertencer a esse vendedor e a ação é registrada em auditoria.
- **CA-005** Dado um gerente autenticado, quando ele tentar atribuir um lead a um vendedor de outra equipe, então o sistema responde `403 Forbidden`.

### RF-019 — Reivindicar lead do pool

- **CA-008** Dado um lead sem responsável e um vendedor abaixo do limite de leads em aberto, quando ele reivindicar o lead, então ele passa a ser o responsável e a ação é registrada em auditoria.
- **CA-009** Dados dois vendedores reivindicando o mesmo lead simultaneamente, então apenas um tem sucesso e o outro recebe `409 Conflict`.
- **CA-010** Dado um vendedor que atingiu o limite de leads em aberto, quando ele tentar reivindicar outro, então o sistema rejeita a operação e informa o limite.

### RF-008 — Criar proposta

- **CA-011** Dado um vendedor autenticado e um cliente atribuído a ele, quando ele criar uma proposta com ao menos um serviço ativo, então a proposta é criada com status `RASCUNHO`, cada item armazena o preço vigente do serviço e a resposta é `201 Created`.
- **CA-012** Dado um vendedor autenticado, quando ele tentar criar uma proposta para um cliente atribuído a outro vendedor, então o sistema responde `403 Forbidden` e nada é persistido.
- **CA-013** Dado um vendedor autenticado e um cliente atribuído a ele, quando ele tentar criar uma proposta sem nenhum serviço, então o sistema responde `400 Bad Request` e nada é persistido.
- **CA-014** Dado um serviço inativo, quando um vendedor tentar incluí-lo em uma nova proposta, então o sistema responde `422 Unprocessable Entity` informando que o serviço está inativo, e nada é persistido.

### RF-009 — Alterar status da proposta

- **CA-015** Dada uma proposta em `RASCUNHO` de um vendedor autenticado, quando ele alterar o status para `ENVIADA`, então o status é atualizado e a ação é registrada em auditoria.
- **CA-016** Dada uma proposta em `EM_NEGOCIACAO` de um vendedor autenticado, quando ele alterar o status para `GANHA`, então o status é atualizado, `closedAt` recebe a data e hora atual e a ação é registrada em auditoria.
- **CA-017** Dada uma proposta em `ENVIADA` ou `EM_NEGOCIACAO`, quando o vendedor alterar o status para `PERDIDA` informando o motivo, então o status é atualizado, o motivo é armazenado e `closedAt` recebe a data e hora atual.
- **CA-018** Dada uma proposta em `ENVIADA` ou `EM_NEGOCIACAO`, quando o vendedor tentar alterar o status para `PERDIDA` sem informar o motivo, então o sistema responde `400 Bad Request` e nada é alterado.
- **CA-019** Dada uma proposta em `GANHA`, quando o vendedor tentar alterar o status para `RASCUNHO`, então o sistema responde `422 Unprocessable Entity` informando que a transição não é permitida, e nada é alterado.
- **CA-020** Dado um vendedor autenticado, quando ele tentar alterar o status de uma proposta de outro vendedor, então o sistema responde `403 Forbidden` e nada é alterado.

### RF-010 — Cancelar venda *(pós-MVP)*

- **CA-021** Dada uma proposta em `GANHA` da equipe de um gerente autenticado, quando ele cancelá-la informando o motivo, então o status passa a `CANCELADA`, o motivo é armazenado e a ação é registrada em auditoria.
- **CA-022** Dado um vendedor autenticado, quando ele tentar cancelar uma proposta em `GANHA`, então o sistema responde `403 Forbidden` e nada é alterado.

### RF-021 — Aceite online pelo cliente *(pós-MVP)*

> Ideias registradas para detalhar quando o requisito entrar em desenvolvimento:
>
> - O cliente aceita a proposta → status `GANHA` e o vendedor é notificado (RF-022).
> - O cliente recusa a proposta → status `PERDIDA` e o vendedor é notificado.
> - O cliente solicita ajustes → status `EM_NEGOCIACAO` e o vendedor é notificado.
> - A definir: validade do link, como identificar o cliente com segurança, se o cliente deve informar o motivo da recusa.

---

## 7. Glossário

| Termo | Significado |
|---|---|
| **Lead** | Contato interessado que ainda não foi trabalhado por um vendedor, ou seja, que ainda não tem nenhuma proposta. Pode vir do site ou ser cadastrado manualmente. |
| **Cliente** | Contato sob responsabilidade de um vendedor. |
| **Pool de leads** | Conjunto de leads sem responsável, disponíveis para reivindicação. |
| **Proposta** | Oferta de um ou mais serviços a um cliente. Ao ser ganha, passa a contar como **venda**. |
| **Venda** | Proposta com status `GANHA`. Não é uma entidade separada. Uma venda cancelada passa a `CANCELADA` e deixa de contar nas métricas de vendas. |
| **Equipe** | Conjunto de vendedores subordinados a um mesmo gerente. |
| **Log de auditoria** | Registro de quem fez qual alteração e quando. Não confundir com *atividade* (interação com o cliente, como ligação ou reunião). |

---

## 8. Questões em aberto

- [x] ~~Definir o que caracteriza um lead "trabalhado".~~ Resolvido: quando o vendedor cria a primeira proposta para ele (RN-007).
- [x] ~~Definir os valores da RN-007 e da RN-009.~~ Resolvido: 3 leads e 24 horas, **fixos no MVP**. Torná-los configuráveis pelo admin fica para depois.
- [x] ~~RN-009: horas corridas ou úteis?~~ Resolvido: horas corridas.
- [ ] Quando um vendedor muda de gerente, o histórico dele acompanha a mudança (comportamento atual) ou permanece com o gerente anterior?
- [ ] Escolher a licença do projeto, considerando o uso como portfólio e a possível venda (ADR pendente).

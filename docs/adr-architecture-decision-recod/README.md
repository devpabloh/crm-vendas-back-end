# Architecture Decision Records (ADRs)

Registro das decisões arquiteturais relevantes do projeto: o contexto que as motivou, as alternativas consideradas, a decisão tomada e suas consequências.

## Convenções

- Um arquivo por decisão, numerado sequencialmente: `NNNN-titulo-curto.md`.
- Use o [template](0000-template.md).
- **ADRs aceitos não são editados.** Se uma decisão mudar, crie um novo ADR e marque o antigo como `Substituído por ADR-NNNN`.
- Status possíveis: `Proposto` · `Aceito` · `Rejeitado` · `Substituído por ADR-NNNN`.

## Índice

| Nº | Título | Status | Data |
|---|---|---|---|
| [0001](0001-single-tenant.md) | Implantação single-tenant | Aceito | 2026-10-18 |
| [0002](0002-arquitetura-em-camadas.md) | Arquitetura em camadas com módulos por domínio | Aceito | 2026-10-18 |
| [0003](0003-distribuicao-de-leads.md) | Distribuição de leads via Strategy | Aceito | 2026-10-18 |

## Decisões pendentes

- Escolha do ORM (Prisma 8, ainda em release candidate).
- Licença do projeto (uso como portfólio × venda).
- Estratégia de autenticação (JWT com refresh token × sessão).

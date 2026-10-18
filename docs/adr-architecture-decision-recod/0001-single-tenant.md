# ADR-0001: Implantação single-tenant (uma instância por empresa cliente)

- **Status:** Aceito
- **Data:** 2026-10-18

## Contexto

O sistema será vendido como projeto sob demanda para empresas de venda de serviços e também servirá como portfólio. Não há, no momento, demanda para que várias empresas compartilhem a mesma instalação. O time é composto por uma pessoa.

## Alternativas consideradas

1. **Single-tenant**: um deploy e um banco de dados por empresa cliente.
2. **Multi-tenant com coluna discriminadora**: uma única instalação, com `tenantId` em todas as tabelas e filtro obrigatório em todas as queries.
3. **Multi-tenant com schema por cliente**: uma instalação, com um schema PostgreSQL por empresa.

## Decisão

Alternativa 1: single-tenant.

## Justificativa

- Menor complexidade: não é preciso filtrar por tenant em cada query, o que elimina uma classe inteira de bugs de vazamento de dados entre empresas.
- Isolamento total dos dados entre clientes, o que facilita a conformidade com a LGPD.
- Permite customizações por cliente sem afetar os demais.

A alternativa 2 seria preferível se o produto evoluir para um SaaS com muitos clientes pequenos, em que o custo de infraestrutura por instância se torna proibitivo.

## Consequências

- (+) Modelo de dados e regras de autorização mais simples.
- (+) Entrega mais rápida do MVP.
- (−) Cada novo cliente exige um deploy próprio e tem custo de infraestrutura por instância.
- (−) Atualizações precisam ser aplicadas em cada instância separadamente.
- (−) Migrar para multi-tenant no futuro exigirá adicionar `tenantId` às tabelas, migrar os dados e revisar todas as queries. Esse custo é aceito em troca da velocidade de entrega agora.

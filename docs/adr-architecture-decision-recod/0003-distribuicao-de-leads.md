# ADR-0003: Distribuição de leads via Strategy

- **Status:** Aceito
- **Data:** 2026-10-18

## Contexto

Leads chegam pelo formulário do site sem responsável. Cada empresa tem uma cultura comercial diferente para distribuí-los: algumas preferem que o gestor atribua, outras que os vendedores escolham e outras um rodízio automático. A forma de distribuição é uma **decisão de negócio** que pode variar entre clientes e mudar com o tempo.

Riscos identificados:

- Vendedores reivindicando leads em excesso, gerando disputas internas.
- Dois vendedores reivindicando o mesmo lead ao mesmo tempo (condição de corrida).

## Alternativas consideradas

1. **Regra fixa no código**: uma única forma de distribuição.
2. **Pattern Strategy**: uma interface `LeadDistributionStrategy` com várias implementações intercambiáveis, selecionada por configuração.

## Decisão

Alternativa 2. Estratégias previstas:

| Estratégia | Comportamento | Entrega |
|---|---|---|
| Pool + atribuição manual | Lead fica sem dono; vendedores reivindicam e gerentes atribuem/reatribuem | MVP |
| Rodízio (*round-robin*) | Lead é atribuído automaticamente ao próximo vendedor ativo | v2 |

A tela de configuração da estratégia (RF-020) é exclusiva do administrador, porque a configuração é global e afeta todas as equipes.

## Justificativa

- Permite adaptar o sistema a cada cliente sem alterar o código dos services.
- No MVP, pool e atribuição manual compartilham o mesmo estado ("lead sem responsável"), então são entregues juntos com baixo custo.
- O rodízio exige controle de fila e de concorrência adicionais, por isso foi adiado.

## Consequências

- (+) Nova estratégia = nova classe, sem modificar as existentes (princípio aberto/fechado).
- (+) As estratégias podem ser testadas isoladamente.
- (−) Uma abstração a mais no código.
- A reivindicação deve ser uma **atualização condicional atômica** (`UPDATE ... WHERE owner_id IS NULL`), verificando o número de linhas afetadas. Se for zero, o lead já foi reivindicado e a resposta é `409 Conflict` (RNF-005, CA-009).
- O excesso de reivindicações é mitigado pelo limite de leads em aberto por vendedor (RN-007) e pelo log de auditoria.

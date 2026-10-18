# ADR-0002: Arquitetura em camadas com módulos por domínio

- **Status:** Aceito
- **Data:** 2026-10-18

## Contexto

O projeto é uma API REST em Node.js, TypeScript e Express, desenvolvida por uma pessoa. Precisa ser fácil de entender (portfólio), fácil de testar e capaz de crescer com novos domínios (clientes, propostas, serviços, dashboard) sem que tudo fique acoplado.

## Alternativas consideradas

1. **MVC simples**: rotas chamam controllers, que acessam o banco diretamente.
2. **Arquitetura em camadas** (routes → controllers → services → repositories), organizada em módulos por domínio.
3. **Clean Architecture / Hexagonal**: domínio isolado de frameworks, com portas e adaptadores para todas as dependências externas.

## Decisão

Alternativa 2: arquitetura em camadas, com o código agrupado por módulo de domínio.

```
Routes → Controllers → Services → Repositories → Database
 (HTTP)   (entrada/     (regras de   (acesso a
           saída)        negócio)     dados)
```

## Justificativa

- Separa as regras de negócio (services) do HTTP e do banco, o que permite testar os services sem subir servidor nem banco.
- Agrupar por módulo (`modules/customers`, `modules/proposals`...) mantém juntos os arquivos que mudam juntos.
- É um padrão amplamente conhecido no mercado, fácil de entender para quem lê o código.
- A alternativa 1 acopla regras de negócio ao Express e ao ORM, dificultando os testes.
- A alternativa 3 traz mais abstração do que o tamanho atual do projeto justifica. Seria preferível se o domínio ficar mais complexo ou se houver necessidade real de trocar a infraestrutura.

## Consequências

- (+) Services testáveis de forma isolada, usando repositórios falsos (*in-memory*).
- (+) Novos domínios entram como novos módulos, sem alterar os existentes.
- (−) Mais arquivos por funcionalidade do que no MVC simples.
- (−) Risco de *services anêmicos* (que apenas repassam chamadas ao repositório). Ponto a observar em code review.
- As pastas de cada módulo são criadas **conforme a necessidade**, não antecipadamente (YAGNI).

## Estrutura de referência

```
src/
├── modules/
│   └── <dominio>/
│       ├── <dominio>.routes.ts
│       ├── <dominio>.controller.ts
│       ├── <dominio>.service.ts
│       ├── <dominio>.repository.ts
│       └── <dominio>.schemas.ts      # validação de entrada (Zod)
├── shared/                           # erros, middlewares, utilitários
├── infra/                            # banco de dados, http, segurança
├── env/                              # validação de variáveis de ambiente
├── app.ts
└── server.ts
```

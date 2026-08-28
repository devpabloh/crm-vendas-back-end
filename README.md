# crm-vendas-back-end

## Estrutura inicial da API RESTful (Depois do projeto terminado o mesmo será refatorado para clean-architecture)

src/
├── config/          # Configurações globais (banco de dados, JWT, envs)
├── controllers/     # Recebem a requisição HTTP e retornam a resposta
├── middlewares/     # Interceptadores (autenticação, validações, tratamento de erro)
├── models/          # Entidades, interfaces e tipos de dados do sistema
├── repositories/    # Comunicação direta com o banco de dados (Queries / ORM)
├── routes/          # Mapeamento de endpoints e métodos HTTP
├── services/        # Regras de negócio da aplicação
├── utils/           # Funções utilitárias reutilizáveis (formatação, hashes)
├── app.ts           # Configuração do servidor e registro de middlewares
└── server.ts        # Ponto de entrada (inicialização do servidor na porta)

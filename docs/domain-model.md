### services

Serviços de consórcio de Imóvel e consórcio de veículo

| Campo | Tipo | Nulo? | Regras | Origem |
|-------|------|:-:|--------|--------|
|`id`|uuid|não|PK|-|
|`name`|text|não|-|RF-014  |
|`description`|text|sim|Texto livre exibido no catálogo|RF-002|
|`price`   |numeric(14,2)|não|`CHECK (price >= 0)`, Preço vigente: alterá-lo não afeta as propostas existentes|RF-014,RN-004|
|`active`|boolean  |não    |Padrão `true`, inativo não aparece no catálogo público|RN-005|
|`created_at`   |timestamptz  |não|Padrão `now()`|-|
|`updated_at`   |timestamptz  |não|Atualizado a cada alteração|-|

**Observações**

- **Serviços não são excluídos, apenas desativados.** Um serviço já usado em propostas é referenciado por `proposal_items.service_id`, Excluí-lo quebraria essa referência e o histórico de vendas.
Por isso, "Remover do catálogo" significa `active=false` (RN-005).
- **`price` é o preço atual, não o preço de venda.** O preço praticado em cada proposta fica em `proposal_items.unit_price` (snapshot, RN-004).

### users

Pessoas da equipe comercial que acessam a área logada: vendedores, gerentes e administradores.

| Campo | Tipo | Nulo? | Regras | Origem |
|-------|------|:-:|--------|--------|
|`id`|uuid|não|PK|-|
|`name`|text|não|-|RF-015|
|`email`|text|não|o email é UNIQUE, para que não possa haver cadastro de dois usuários com o mesmo e-mail, evitando duplicação|RF-004|
|`password_hash`|text|não|nunca é retornado nenhuma resposta da API|RNF-002, RF-005, RF-004|
|`role`|`user_role` (`SELLER`, `MANAGER`, `ADMIN`)|não|Padrão `SELLER`|RF-015, RN-002|
|`manager_id`|uuid|sim|FK → `users.id`. Obrigatório quando `role = SELLER`: `CHECK (role <> 'SELLER' OR manager_id IS NOT NULL)`|RN-011|
|`created_at`|timestamptz  |não|Padrão `now()`|-|
|`updated_at`|timestamptz  |não|atualizado a cada alteração|-|

**Observações**

- **A senha nunca é armazenada, apenas o seu hash.** O hash é de mão única: não existe forma de revertê-lo para obter a senha. No login, o sistema aplica o hash à senha informada e compara com o valor armazenado. Assim, mesmo que o banco seja vazado, as senhas não ficam expostas (RNF-002).
- **A hierarquia é modelada por autorrelacionamento.** O vendedor aponta para o seu gerente na própria tabela `users`, por meio do `manager_id`, sem uma tabela `teams`. Uma tabela de equipes só se justificaria se elas tivessem dados próprios (nome, meta) ou se um vendedor pudesse pertencer a mais de uma equipe (RN-011).
- **O banco não garante que `manager_id` aponta para um gerente.** O `CHECK` só enxerga a própria linha: ele garante que todo vendedor *tem* um gerente, mas não que esse usuário tem `role = MANAGER`. Essa validação fica na camada de serviço.
- **O papel padrão é `SELLER` por ser o de menor privilégio.** Se o papel não for informado no cadastro, o usuário recebe o mínimo de acesso, e não o máximo, seguindo o princípio do menor privilégio.
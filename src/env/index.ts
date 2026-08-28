import 'dotenv/config' // Carrega as variáveis do arquivo .env para o process.env do Node.js
import { envSchema } from './schema.js' // Aqui nós estamos importando o Schema que criamos através do zod, que define o formato esperado das variáveis
import {z} from 'zod'

const _env = envSchema.safeParse(process.env) // aqui nós estamos comparando os dados que temos no envSchema, com os dados que estão vindo do arquivo .env na raiz do projeto

// Se a validação falhar (_env.success === false), exibe os detalhes do erro no terminal e interrompe o servidor
if(!_env.success){
    console.error(`Variáveis de ambiente inválidas`)

    // O z.treeifyError recebe a instância do erro (_env.error) e gera uma árvore legível no terminal
    console.log(z.treeifyError(_env.error))

    throw new Error(`Variáveis de ambiente inválidas`)
}

export const env = _env.data // aqui exporta as variáveis já validadas e fortemente tipadas para o restante do projeto

/* 
Diferença entre z.treeifyError(), console.error() e throw new Error()

* z.treeifyError() tem como papel principal formatação, na prática ele transforma o erro bruto do zod em um texto estruturado em árvore.
* console.error() tem como papel principal a exibição (log), na prática ele escreve uma mensagem ou texto no terminal (canal de erro stderr).
* throw new Error() tem como papel principal interromper o fluxo do programa, na prática ele dispara uma exceção que para a execução do sistema imediatamente.

*/
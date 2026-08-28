import express from 'express'
import cors from 'cors'; // Impotando a biblioteca CORS que é a responsável por liberar/permitir o acesso entre origens diferentes (exemplo, o front-end rodando em localhost:3000 acessando a API em localhost:3333), sem utilizar o CORS o navegador bloqueia essa comunicação por segurança.

export const app = express() // Aqui nós estamos inicializando o nosso servidor utilizando o framework express, estamos criando uma instância do servidor para ser mais exato.

app.use(cors()) // utilizamos o app.use() passando o cors() para aplicar(usar) as regras de liberação do CORS para todas as rotas
app.use(express.json()) // Habilita o parse de JSON para conseguirmos ler o corpo das requisições (req.body)

app.get('/', (req, res)=>{
    res.json({status: 'ok'})
})
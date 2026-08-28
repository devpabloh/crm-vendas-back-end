import {app} from './app.js' // aqui nós estamos importando a nossa instância do servidor que foi criada
import {env} from './env/index.js'

// Primeiro Parâmetro: Aqui estamos passando a porta que o servidor/aplicação vai ficar escutando
// Segundo Parâmetro: Aqui estamos passando o host '0.0.0.0', que todos os endereços de rede/interfaces poderão se conectar a API (isso faz com que dispositivos na mesma rede local, contêiners Docker ou ambientes de hospedagem(nuvem) consigam acessar a API), porque mesmo se estivermos conectados na mesma rede, se o host for diferente, a conexão será dada como recusada
// O terceiro é uma função de callback que vai retornar que o servidor está rodando e qual a porta que ele está rodando
app.listen(env.PORT, '0.0.0.0', ()=> {
    console.log(`Servidor está rodando na porta ${env.PORT}`)
})
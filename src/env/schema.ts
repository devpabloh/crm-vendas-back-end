import {z} from 'zod' // Aqui estamo importando a biblioteca de validação em tempo de execução

export const envSchema = z.object({
    PORT: z.coerce.number().default(3000) // aqui utilizamos o coerce para transformar a string "3000" em number 3000
})
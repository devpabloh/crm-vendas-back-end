import {z} from 'zod' // Aqui estamo importando a biblioteca de validação em tempo de execução

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000), // aqui utilizamos o coerce para transformar a string "3000" em number 3000
    DATA_BASE_URL: z.url(),
    JWT_SECRET: z.string().min(32, 'JWT precisa ter pelo menos 32 caracteres')
})
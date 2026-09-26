import js from '@eslint/js'
import {defineConfig} from 'eslint/config'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default defineConfig(
    {ignores: ['dist', 'coverage', 'node_modules']},
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            globals: globals.node,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname 
            }
        }
    },
    prettier // Aqui é bom sempre passar por último, porque ele desliga as regras do eslint que entram em conflito com as regras do prettier
)
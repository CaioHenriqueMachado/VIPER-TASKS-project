// DEPENDENCIAS
// EXPRESS: microframework, serve para trazer as configurações básicas sobre rotas
// NODEMON: Para subir serve sozinho ao salvar (Está em homologação somente)
// KNEX JS: Para traduzir liguagem do banco em JS
// SQLITE3: Banco a ser usado.

// EXECUTAR (npx knex init) para EXECUTAR UM PACOTE É (npx), knex para criar um arquivo do bancco. 
const express = require('express');

const { request, response } = require('express');

const app = express();

app.use(express.json());
/**
 * METODOS HTTP:
 * GET: Buscar/Listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Altera uma informação no back-end
 * DELETE: Deleta uma informação no back-end 
 */

 /**
  * TIPOS DE PARÂMETROS:
  * Query Params: Parâmetros nomeados enviados na rota após o simbolo de "?". Serve para filtros, paginação, etc.
  * Route Params: Parâmetros utilizados para identificar recursos.
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recusos.
  */

// REQUEST: Guarda todos os dados que vem da requisição do usuario.
// RESPONSE: Responsavel por retornar uma respota para o usuário.

// Query Builder: Escrever linhas de bancos na estrutura do node.
app.get('/user', (request, response) => {
    return response.json({
        event: 'Semana',
        aluno: 'Caio'
    });
});

app.listen(3333);
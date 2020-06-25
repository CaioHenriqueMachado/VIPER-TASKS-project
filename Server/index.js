// DEPENDENCIAS
// EXPRESS: microframework, serve para trazer as configurações básicas sobre rotas
const express = require('express');
const { request, response } = require('express');

const app = express();

/**
 * METODOS HTTP:
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Altera uma informação no back-end
 * DELETE: Deleta uma informação no back-end **/

app.get('/user', (request, response) => {
    return response.json({
        event: 'Semana',
        aluno: 'Diego'
    })
})
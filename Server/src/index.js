const express = require('express'); //É um pacote
const routes = require('./routes'); // É um arquivo
const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333);
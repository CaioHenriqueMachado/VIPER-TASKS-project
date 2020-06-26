const express = require('express'); //É um pacote
const cors = require('cors');
const routes = require('./routes'); // É um arquivo



const app = express();

app.use(cors());//Tem que ajustar para dizer qual endereço pode acessa-lo.
app.use(express.json());

app.use(routes);

app.listen(3333);
const express = require('express');

const db = require('./data/dbConfig.js');
const  AccountsRouter= require('./accounts/accounts-router.js');

const server = express();
server.use(express.json()); //body parser should always be before the router,else will not be able to post data
server.use('/api/accounts', AccountsRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Let's write some api using knex!</h2>`)
  });
  

module.exports = server;
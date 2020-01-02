const express = require('express');

const db = require('./data/dbConfig.js');
const accounts = require('./routes/accounts/accountsRouter')
const server = express();

server.use('/api/accounts', accounts)

server.use(express.json());

module.exports = server;
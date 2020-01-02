const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get( '/api/accounts' , (req, res) => {
    db('accounts')
    .then(accounts => {
        return res.status(200).json({accounts})
    } )
    .catch(err => {
        console.log(err)
    })
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts').where({id:req.params.id}).first()
    .then(accounts => {
        return res.status(200).json({accounts})
    })
    .catch(err => {
        console.log(err)
    })
 })

 server.post('/api/accounts', (req, res) => {
    const newAccount = req.body
    db('accounts').insert(newAccount, 'id')
      .then(([id]) => {
        db('accounts')
          .where({ id })
          .first()
          .then(post => {
            res.status(201).json(post)
          })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

 server.put('/api/accounts/:id', (req, res) => {
    const changes = req.body
    db('accounts')
      .where('id', req.params.id)
      .update(changes)
      .then(count => {
        res.status(200).json({ message: `Successfully updated ${count} record(s).`})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })
  server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
      .where({id: req.params.id})
      .del()
      .then(count => {
        res.status(200).json({ message: `Successfully deleted ${count} records(s).`})
      })
  })



module.exports = server;
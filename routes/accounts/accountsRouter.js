const router = require('express').Router()
const db = require('../../data/dbConfig')

router.get('/', (req, res) => {
db('*').from('accounts').then(accounts => {
    res.send(accounts)
})
})

module.exports = router
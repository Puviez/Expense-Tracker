const express = require('express')
const trans = express.Router()
const User = require('../models/users.js')
const Transaction = require('../models/transactions.js')

// New
trans.get('/new', (req, res) => {
    res.render('./app/transactions/new.ejs')
  })

// Create
trans.post('/', (req, res) => {
    Transaction.create(req.body, (err, transaction) => {
      if (err) {
        console.log(err)
      }
      console.log(transaction);
      res.redirect('/app')
    })
  })

module.exports = trans
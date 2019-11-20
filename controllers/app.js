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
    req.body.owner = req.session.currentUser._id;

    Transaction.create(req.body, (err, transaction) => {
      if (err) {
        console.log(err)
      }
      console.log(transaction);
      res.redirect('/app')
    })
  })

// Edit 
trans.get('/:id/edit', (req,res) => {
    Transaction.findById(req.params.id, (err,transaction) => {
        res.render('users/edit.ejs', {
            transaction: transaction
        });
    });
  });
  
  // Update
  trans.put('/:id', (req,res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateUser) => {
        res.redirect('/app/' + req.params.id);
    });
  });

module.exports = trans
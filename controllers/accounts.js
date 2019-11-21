const express = require('express')
const acc = express.Router()
const User = require('../models/users.js')
const Transaction = require('../models/transactions.js')
const Account = require('../models/accounts.js')

// Index
acc.get('/all', (req, res) => {
    Account.find({}, (err, account) => {
      res.render('./app/accounts/index.ejs', {
        account: account
      });
    });
  });
  
// New
acc.get('/new', (req, res) => {
    res.render('./app/accounts/new.ejs');
});

// Create
acc.post('/', (req, res) => {
    req.body.owner = req.session.currentUser._id;
    Account.create(req.body, (err, account) => {
    if (err) {
        console.log(err)
    }
    console.log(account);
    res.redirect('/')
    })
})

// Show
acc.get('/:id', (req, res) => {
    Account.findById(req.params.id, (err,account) => {
        res.render('./app/accounts/view.ejs', {
            account: account
        });
    });
});
  
acc.delete('/:id', (req,res) => {
    Account.findByIdAndRemove(req.params.id, (err,account) => {
        res.redirect('/acc');
    });
});

// Edit 
acc.get('/:id/edit', (req,res) => {
    Account.findById(req.params.id, (err,account) => {
        res.render('./app/accounts/edit.ejs', {
            account: account
        });
    });
});

// Update
acc.put('/:id', (req,res) => {
    Account.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateAccount) => {
        res.redirect('/acc/' + req.params.id);
    });
});

module.exports = acc
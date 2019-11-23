const express = require('express')
const acc = express.Router()
const User = require('../models/users.js')
const Transaction = require('../models/transactions.js')
const Account = require('../models/accounts.js')

const sum = (arr) => {
    let total = 0;
    for(let i in arr){
      if(arr[i].expense_type === "Expense"){
        total -= parseFloat(arr[i].amount);
      } else {
        total += parseFloat(arr[i].amount);
      }
    }
    return total;
}

// Index
acc.get('/all', (req, res) => {
    if(req.session.currentUser){
        Account.find({}, (err, account) => {
            res.render('./app/accounts/index.ejs', {
                account: account,
                currentUser: req.session.currentUser
            });
        });
    } else {
        res.redirect('/sessions/new');
    }
  });
  
// New
acc.get('/new', (req, res) => {
    if(req.session.currentUser){
        res.render('./app/accounts/new.ejs', {
            currentUser: req.session.currentUser
        });
    } else {
        res.redirect('/sessions/new');
    }
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
    if(req.session.currentUser){
        Account.findById(req.params.id, (err,account) => {
            Transaction.find({ account: account.account_name}, (err,transaction) => {
                res.render('./app/accounts/view.ejs', {
                    account: account,
                    transaction: transaction,
                    balance: sum(transaction),
                    currentUser: req.session.currentUser
                });
            });
        });
    } else {
        res.redirect('/sessions/new');
    }
});
  
acc.delete('/:id', (req,res) => {
    Account.findByIdAndRemove(req.params.id, (err,account) => {
        res.redirect('/acc/all');
    });
});

// Edit 
acc.get('/:id/edit', (req,res) => {
    if(req.session.currentUser){
        Account.findById(req.params.id, (err,account) => {
            res.render('./app/accounts/edit.ejs', {
                account: account,
                currentUser: req.session.currentUser
            });
        });
    } else {
        res.redirect('/sessions/new');
    }
});

// Update
acc.put('/:id', (req,res) => {
    Account.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateAccount) => {
        res.redirect('/acc/' + req.params.id);
    });
});

module.exports = acc
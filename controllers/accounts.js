const express = require('express')
const acc = express.Router()
const User = require('../models/users.js')
const Transaction = require('../models/transactions.js')
const Account = require('../models/accounts.js')

// // Index
// trans.get('/history', (req, res) => {
//     Transaction.find({}, (err, transaction) => {
//       res.render('./app/transactions/index.ejs', {
//         transaction: transaction
//       });
//     });
//   });
  
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

module.exports = acc

  
//   // Show
//   trans.get('/:id', (req, res) => {
//       Transaction.findById(req.params.id, (err,transaction) => {
//           res.render('./app/transactions/show.ejs', {
//               transaction: transaction
//           });
//       });
//     });
  
//   trans.delete('/:id', (req,res) => {
//       Transaction.findByIdAndRemove(req.params.id, (err,transaction) => {
//           res.redirect('/app/history');
//       });
//   });
  
//   // Edit 
//   trans.get('/:id/edit', (req,res) => {
//       Transaction.findById(req.params.id, (err,transaction) => {
//           res.render('./app/transactions/edit.ejs', {
//               transaction: transaction
//           });
//       });
//     });
    
//     // Update
//     trans.put('/:id', (req,res) => {
//       Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateUser) => {
//           res.redirect('/app/' + req.params.id);
//       });
//     });
  
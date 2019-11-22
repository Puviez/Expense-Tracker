const express = require('express')
const users = express.Router()
const User = require('../models/users.js')
const Account = require('../models/accounts.js')

// New
users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
    currentUser: req.session.currentUser
  })
})

// Create
users.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err)
    }
    console.log(createdUser);
    res.redirect('/')
  })
})


// Show
users.get('/:id', (req, res) => {
  User.findById(req.params.id, (err,user) => {
    Account.find({ owner: user.id}, (err,account) => {
      res.render('users/view.ejs', {
          user: user,
          account: account,
          currentUser: req.session.currentUser
      });
    });  
  });
});

// Edit 
users.get('/:id/edit', (req,res) => {
  User.findById(req.params.id, (err,user) => {
      res.render('users/edit.ejs', {
          user: user,
          currentUser: req.session.currentUser
      });
  });
});

// Update
users.put('/:id', (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateUser) => {
      res.redirect('/users/' + req.params.id);
  });
});

module.exports = users
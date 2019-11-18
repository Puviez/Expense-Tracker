const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// New
users.get('/new', (req, res) => {
  res.render('users/new.ejs')
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
      res.render('users/view.ejs', {
          user: user
      });
  });
});

// Edit 
users.get('/:id/edit', (req,res) => {
  User.findById(req.params.id, (err,user) => {
      res.render('users/edit.ejs', {
          user: user
      });
  });
});

// Update
users.put('/:id', (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err,updateUser) => {
      res.redirect('/users/:id');
  });
});

module.exports = users
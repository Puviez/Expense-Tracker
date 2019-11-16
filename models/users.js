const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: String,
  age: Number
})

const User = mongoose.model('User', userSchema)

module.exports = User
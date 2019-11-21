const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = Schema({
  account_name: {type: String, required: true},
  account_type: {type: String, required: true},
  bank: {type: String, required: true},
  card_name: {type: String},
  owner: { type: Schema.Types.ObjectId, ref: "User" }
})

const Account = mongoose.model('Account', accountSchema)

module.exports = Account
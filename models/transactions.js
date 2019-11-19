const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = Schema({
  date: {type: Date, required: true},
  details: {type: String, required: true},
  classification: {type: String, required: true},
  amount: {type: Number, required: true},
  transaction_type: {type: String, required: true},
  owner: { type: Schema.Types.ObjectId, ref: "userSchema" }
})

const Transaction = mongoose.model('Transcation', transactionSchema)

module.exports = Transaction
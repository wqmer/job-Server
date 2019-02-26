
import mongoose from 'mongoose'
import customerSchema from '../schemas/customer'

module.exports = mongoose.model('Customer', customerSchema);
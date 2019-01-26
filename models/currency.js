
import mongoose from 'mongoose'
import currencySchema from '../schemas/currency'

module.exports = mongoose.model('Currency', currencySchema);
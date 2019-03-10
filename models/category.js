import mongoose from 'mongoose'
import categorySchema from '../schemas/category'

module.exports =  mongoose.model('Category',categorySchema);
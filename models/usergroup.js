import mongoose from 'mongoose'
import userGroupSchema from '../schemas/usergroup'

module.exports = mongoose.model("UserGroup",userGroupSchema);
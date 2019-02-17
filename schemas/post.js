
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    title:String,
    author:String,
	dateAdded:String,
    viewCount:Number
});



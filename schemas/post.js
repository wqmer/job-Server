
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    title:String,
    author:String,
	description:String,
	dateAdded:Date,
    viewCount:Number
});



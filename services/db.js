//import mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
//using mongoose define connection string
mongoose.connect('mongodb://localhost:27017/bank', () => {
    console.log('mongodb connected sucessfully');
})
//create model for project
//collection - users
const User = mongoose.model('User', {
    username: String,
    acno: Number,
    password: String,
    balance: Number,
    transaction: []
})
//export model
module.exports = {
    User
}
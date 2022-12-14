const mongoose = require('mongoose')

/** This is the mongoose model for the users*/
const userSchema = new mongoose.Schema({
    username: { type :String, unique: true, required: true },
    password: { type: String, required: true, select: false} // the password will not be selected in any request by default
})

const User = mongoose.model('User', userSchema)

module.exports = User

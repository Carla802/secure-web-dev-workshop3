const User = require('./users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

/**
 * This function creates a new user
 * @param username - username of the new user
 * @param password - password of the new user
 */
async function register (username, password){
    const hash = await bcrypt.hash(password, 10)
    const user = new User({username, password: hash})
    return await user.save()
}

/**
 * This function verifies if a user exists and if the password is correct
 * @param username - username of this user
 * @param password - password of this user
 */
async function checkPassword(username, password){
    const user = await User.findOne({ username }).select("+password")
    if (!user) { return false }
    const match = await bcrypt.compare(password,user.password)
    if (!match) {
        return false
    }
    return user
}

/**
 * This function generates a JWT (Json Web Token) when a user log in, containing the user's id
 * It uses the secret key in the .env file
 * @param id - id of the user who is logging in
 */
async function signJWT(id){
    return jwt.sign({"sub":id},process.env.SECRET_JWT);
}

/**
 * This function returns an existing user with its JWT
 * @param token - JWT of the user
 */
async function findOne(token){
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const userId = decoded.sub
    const user = await User.findById(userId).select('+password')
    return user
}

/**
 * This function modifies an existing user with its JWT and returns the updated version
 * If the password is updated, it is hashed again
 * @param token - JWT of the user
 * @param body - Updated infos of the user
 */
async function update(token, body) {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const userId = decoded.sub
    const hash = await bcrypt.hash(body.password, 10)
    body.password = hash
    await User.findOneAndUpdate({_id: userId}, body).select('+password')
    return User.findById(userId).select('+password')

}

/**
 * This function deletes an existing user with its JWT
 * @param token - JWT of the user
 */
function del(token){
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const userId = decoded.sub
    return User.deleteOne({_id: userId})
}

/**
 * This function returns all existing users without their password
 */
function findAll () {
    return User.find()
}

module.exports = {register, checkPassword, signJWT, findOne, update, del, findAll}

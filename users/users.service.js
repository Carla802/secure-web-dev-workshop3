const User = require('./users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

/**
 * This function creates a new user and returns it or returns false if the username already exists
 * @param username - username of the new user
 * @param password - password of the new user
 * @param role - role of the new user
 */
async function register (username, password, role){
    const user = await User.findOne({ username })
    if (user) { return false }
    const hash = await bcrypt.hash(password, 10)
    //const newuser = new User({username, password: hash, role})
    //return await newuser.save()
    return await User.insertMany({username, password: hash, role})

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
 * This function generates a JWT (Json Web Token) when a user logs in, containing the user's id (in .sub) and the user's role (in .role)
 * It uses the secret key in the .env file
 * @param id - id of the user who logged in
 * @param role - role of the user who logged in
 */
async function signJWT(id, role){
    return jwt.sign({"sub":id, "role": role},process.env.SECRET_JWT);
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
    await User.findOneAndUpdate({_id: userId}, body).select('+password').select('-role')
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

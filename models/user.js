const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true               
    },
    isCustomer: String,
    email: {
        type: String,
        required: true,
        unique: true
    },  
    password: {
        type: String,
        required: true
    },  
    date: { type: Date, default: Date.now },
    isAdmin: Boolean,
    role: String
})

userSchema.methods.generateJWT = function() {
    return jwt.sign({ 
        _id: this._id, 
        name: this.name,
        role: this.role,
        isAdmin: this.isAdmin 
    }, process.env.SECRET_KEY)
}

const User = mongoose.model('user', userSchema)


module.exports = User
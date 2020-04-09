const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    TrustedUsers: {
        type: Array,
        require: false
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);

}
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);

}

module.exports.addTrustedUser = function(username, TrustedUsers, callback){
    const query = {username: username};
    //const newValues = {$set: {TrustedUsers: "Hello"}};
    //User.findOne(query, callback);
   // User.updateOne(query, newValues);
        //{},
        //{$push: {TrustedUsers: TrustedUsers}},
        //callback
    //);
    //User.findById(username, callback);
    
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);

        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);

    });

}

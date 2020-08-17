const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        email: true
    },
    password: {
        type: String,
        required: true
    },
    
    bio: {
        type: String,
        default: 'Bio'
    },
    gender:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User', UserSchema);
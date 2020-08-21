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
    job: {
        type: String,
        default: 'Job Title'
    },
    bio: {
        type: String,
        default: 'Bio'
    },
});

module.exports = mongoose.model('User', UserSchema);
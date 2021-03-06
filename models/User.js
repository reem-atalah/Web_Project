const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    // Courses: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Course"
    // }],
    Courses: {
        type: [String]
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'err'

    },
    confirmed:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', UserSchema);
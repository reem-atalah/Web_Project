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

    image: {
        type: String,

    },
    Courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course"
    }],
    gender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
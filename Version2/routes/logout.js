const router = require('express').Router();
const passport = require('passport');
const checkFunc = require('../functions');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    req.flash('message', 'Logged out successfully !')
    return res.redirect('login')
});
module.exports = router;
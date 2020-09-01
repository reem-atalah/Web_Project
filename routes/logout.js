const router = require('express').Router();
const passport = require('passport');
const checkFunc = require('../functions');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const session = require('express-session');


router.get('/', (req, res) => {
    req.flash('message', 'Logged out successfully !');
    req.session.destroy();
    router.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    return res.redirect('login');

});

module.exports = router;
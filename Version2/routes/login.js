const router = require('express').Router();
const passport = require('passport');
const checkFunc = require('../functions');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/', checkFunc.checkNotAuth, (req, res) => {
    return res.render('login', {
        title: 'Log In',
        css: 'login',
        RegisterOrProfileLink: 'Register',
        RegisterOrProfile: 'Register',
        loginOrOut: 'login',
        log: 'Log in',
        message: req.flash('message')

    })
});
router.post('/', checkFunc.checkNotAuth, passport.authenticate('local', {
    successRedirect: '/Home',
    failureRedirect: '/contact',
    failureFlash: true
}), async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        let user = await User.findOne({ username: username });

        if (!user) {
            req.flash('message', 'Wrong username');
            return res.redirect('/login');
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            req.flash('message', 'Wrong password');
            return res.redirect('/login');
        }
        // console.log(req.user);
        req.flash('message', 'Auth');
        res.redirect('/Home');

    } catch (err) {
        return console.error(err);
    }
});
// router.post('/', passport.authenticate('local', {
//     successRedirect: '/Home',
//     failureRedirect: '/contact',
//     failureFlash: true
// }));

module.exports = router;
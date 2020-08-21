const router = require('express').Router();
const passport = require('passport');
const checkFunc=require('../functions');

router.get('/',checkFunc.checkNotAuth, (req, res) => {
    return res.render('login', {
        title: 'Log In',
        css: 'login',
        RegisterOrProfileLink: 'Register',
        RegisterOrProfile: 'Register',
        loginOrOut: 'login',
        log:'Log In',
        message : req.flash('message')

    })
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/Home',
    failureRedirect: '/contact',
    failureFlash: true
}));

module.exports = router;

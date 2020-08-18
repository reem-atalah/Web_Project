const router = require('express').Router();
const passport = require('passport');
const checkFunc=require('../functions');

router.get('/',checkFunc.checkNotAuth, (req, res) => {
    res.render('login', {
        title: 'Log In',
        css: 'login'
    })
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/user-profile',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;

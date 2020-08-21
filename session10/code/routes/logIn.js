const router = require('express').Router();
const passport = require('passport');
const checkFunc=require('../checkFunc');


router.get('/', checkFunc.checkNotAuth, (req, res) => {
    res.render('log_in', {
        title: "Log In",
        css: "log"
    });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/log_in',
    failureFlash: true
}));

module.exports = router;
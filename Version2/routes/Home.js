const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        return res.render('Home', {
            title: 'Home',
            css: 'style',
            RegisterOrProfileLink: 'Register',
            RegisterOrProfile: 'Register',
            loginOrOut: 'login',
            log:'Log In',
            message : req.flash('message')
        })
    }
    if (checkFunc.checkAuth) {
        return res.render('Home', {
            title: 'Home',
            css: 'style',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'Your Profile',
            loginOrOut: 'logout',
            log:'Log Out',
            message : req.flash('message')
        })
    }

});

module.exports = router;
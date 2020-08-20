const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        res.render('Graphics', {
            title: '3D Graphics',
            css: 'Graphics',
            RegisterOrProfileLink: 'Register',
            RegisterOrProfile: 'Register',
            loginOrOut: 'login',
            log:'Log In'

        })
    }
    if (checkFunc.checkAuth) {
        res.render('contact', {
            title: 'Contact Us',
            css: 'contact',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'Your Profile',
            loginOrOut: 'Home',
            log:'Log Out'
        })
    }

});

module.exports = router;
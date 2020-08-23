const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        return res.render('Embedded', {
            title: 'Embedded Systems',
            css: 'Embedded',
            RegisterOrProfileLink: 'Register',
            RegisterOrProfile: 'Register',
            loginOrOut: 'login',
            log: 'Log in'

        })
    }
    if (checkFunc.checkAuth) {
        return res.render('contact', {
            title: 'Contact Us',
            css: 'contact',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'Your Profile',
            loginOrOut: 'Home',
            log: 'Log Out'
        })
    }

});

module.exports = router;
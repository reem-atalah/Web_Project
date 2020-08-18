const router = require('express').Router();
const checkFunc=require("../functions");

router.get('/', (req, res) => {
    if(checkFunc.checkNotAuth){
        res.render('Home', {
            title: 'Home',
            css: 'style',
            RegisterOrProfileLink: 'Register',
            RegisterOrProfile: 'Register',
            loginOrOut: 'login',
            log:'Log In'
        })
    }
    if(checkFunc.checkAuth){
        res.render('Home', {
            title: 'Home',
            css: 'style',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'Your Profile',
            loginOrOut: 'logout',
            log:'Log Out'
        })
    }
    
});

module.exports = router;
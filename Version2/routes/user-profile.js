const router = require('express').Router();
const checkFunc=require("../functions");

router.get('/',checkFunc.checkAuth, (req, res) => {
    return res.render('user-profile', {
        title: 'user-profile',
        css: 'user-profile',
        header: 'header_out',
        RegisterOrProfileLink: 'user-profile',
        RegisterOrProfile: 'Your Profile',
        loginOrOut: 'logout',
        log:'Log Out'
    })
});

module.exports = router;
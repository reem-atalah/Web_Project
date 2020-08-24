const router = require('express').Router();
const { checkAuth } = require('../functions');
const checkFunc = require("../functions");
const User = require('../models/User');
// router.get('/', checkFunc.checkAuth, (req, res) => {
//     return res.render('user-profile', {
//         title: 'user-profile',
//         css: 'user-profile',
//         header: 'header_out',
//         RegisterOrProfileLink: 'user-profile',
//         RegisterOrProfile: 'Your Profile',
//         loginOrOut: 'logout',
//         log: 'Log Out'
//     })
// });

router.get('/:username', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }
        console.log(user.username)
        res.render('user-profile', {
            title: user.username,
            css: "user-profile",
            user: user,
            header: 'header_out',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'My profile',
            loginOrOut: 'logout',
            log: 'Log Out'
        });
    } catch (err) {
        return console.log(err);
    }


});


module.exports = router;
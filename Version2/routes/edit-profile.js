const router = require('express').Router();
const { checkAuth } = require('../functions');
const checkFunc = require("../functions");
const User = require('../models/User');

router.get('/:username', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            req.flash('message', 'There is no such user')
            return res.redirect('/register');
        }
        res.render('/edit-profile', {
            title: user.username + "/edit-profile",
            css: "user-profile",
            user: user,
            header: 'header_out'
            // RegisterOrProfileLink: 'user-profile',
            // RegisterOrProfile: 'My profile',
            // loginOrOut: 'logout',
            // log: 'Log Out'
        });
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;
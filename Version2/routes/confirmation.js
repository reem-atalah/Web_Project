const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('confirmation', {
        title: 'Confirmation',
        css: 'confirmation',
        RegisterOrProfileLink: 'user-profile',
        RegisterOrProfile: 'Your Profile',
        loginOrOut: 'Home',
        log:'Log Out',
        message : req.flash('message')

    })
});

module.exports = router;
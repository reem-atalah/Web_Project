const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('confirmation', {
        title: 'Confirmation',
        css: 'confirmation',
        RegisterOrProfileLink: 'user-profile',
        RegisterOrProfile: 'Your Profile',
        loginOrOut: 'Home',
        log:'Log Out'
    })
});

module.exports = router;
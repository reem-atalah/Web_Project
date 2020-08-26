const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('confirmation', {
        title: 'Confirmation',
        css: 'confirmation',
        user: req.user,
        message: req.flash('message')

    })
});

module.exports = router;
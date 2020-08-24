const router = require('express').Router();

router.get('/', (req, res) => {
    return res.render('confirmation', {
        title: 'Confirmation',
        css: 'confirmation',
        message: req.flash('message')

    })
});

module.exports = router;
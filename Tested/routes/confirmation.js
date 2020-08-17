const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('confirmation', {
        title: 'Confirmation',
        css: 'confirmation'
    })
});

module.exports = router;
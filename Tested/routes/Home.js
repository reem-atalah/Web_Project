const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('Home', {
        title: 'Home',
        css: 'style'
    })
});

module.exports = router;
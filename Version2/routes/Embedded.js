const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        res.render('Embedded', {
            title: 'Embedded Systems',
            css: 'Embedded'

        })
    }


});

module.exports = router;
const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        res.render('Web', {
            title: 'Web Development',
            css: 'Web'

        })
    }


});

module.exports = router;
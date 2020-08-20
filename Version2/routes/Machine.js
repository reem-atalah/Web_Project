const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        res.render('Machine', {
            title: 'Machine Learning',
            css: 'Machine'

        })
    }


});

module.exports = router;
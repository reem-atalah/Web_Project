const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
    if (checkFunc.checkNotAuth) {
        res.render('Graphics', {
            title: '3D Graphics',
            css: 'Graphics'

        })
    }


});

module.exports = router;
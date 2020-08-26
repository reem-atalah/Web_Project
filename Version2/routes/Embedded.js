const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {

        return res.render('Embedded', {
            title: 'Embedded Systems',
            css: 'Embedded',
            user: req.user

        })
});

module.exports = router;
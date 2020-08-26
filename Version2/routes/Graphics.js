const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
        return res.render('Graphics', {
            title: '3D Graphics',
            css: 'Graphics',
            user: req.user

        })

});

module.exports = router;
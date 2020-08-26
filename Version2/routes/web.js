const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
        return res.render('Web', {
            title: 'Web Development',
            css: 'Web',
            user: req.user,
        })

});

module.exports = router;
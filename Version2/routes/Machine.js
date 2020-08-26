const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {
        return res.render('Machine', {
            title: 'Machine Learning',
            css: 'Machine',
            user: req.user,
        })

});

module.exports = router;
const router = require('express').Router();
const checkFunc=require("../functions");

router.get('/',checkFunc.checkNotAuth, (req, res) => {
    res.render('user-progile', {
        title: 'user-progile',
        css: 'user-progile'
    })
});

module.exports = router;
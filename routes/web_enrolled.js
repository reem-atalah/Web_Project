const router = require('express').Router();
const checkFunc = require("../functions");


router.get('/', checkFunc.checkAuth,(req, res) => {
    return res.render('web_enrolled', {
        title: 'Web Development',
        css: 'web_enrolled',
        user: req.user,
    })

});
module.exports = router;
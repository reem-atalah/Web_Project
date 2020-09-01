const router = require('express').Router();
const checkFunc = require("../functions");


router.get('/',checkFunc.checkAuth, (req, res) => {
    return res.render('Machine_enrolled', {
        title: 'Machine Learning',
        css: 'Machine_enrolled',
        user: req.user,
    })

});
module.exports = router;
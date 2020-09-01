const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/',checkFunc.checkAuth, (req, res) => {
    return res.render('Graphics_enrolled', {
        title: '3D Graphics',
        css: 'Graphics_enrolled',
        user: req.user

    })

});
module.exports = router;
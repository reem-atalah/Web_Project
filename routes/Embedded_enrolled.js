const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/',checkFunc.checkAuth, (req, res) => {

        return res.render('Embedded_enrolled', {
            title: 'Embedded Systems',
            css: 'Embedded_enrolled',
            user: req.user

        })
});


module.exports = router;
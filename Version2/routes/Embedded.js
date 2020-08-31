const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {

    if(req.user && req.user.Courses){
        let obj = req.user.Courses.find(obj => obj === "Embedded");
        if(obj){
            return res.render('Embedded_enrolled', {
                title: 'Embedded Systems',
                css: 'Embedded_enrolled',
                user: req.user
        
            })
        }
    }
        return res.render('Embedded', {
            title: 'Embedded Systems',
            css: 'Embedded',
            user: req.user

        })
});

router.post('/', checkFunc.checkAuth,async (req,res)=>{
    user= req.user
    user.Courses.push("Embedded");
    user=await user.save();

    return res.render('Embedded_enrolled', {
        title: 'Embedded Systems',
        css: 'Embedded_enrolled',
        user: req.user

    })
});
module.exports = router;
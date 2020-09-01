const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {

    if(req.user && req.user.Courses){
        let obj = req.user.Courses.find(obj => obj === "Graphics");
        if(obj){
           
    return res.render('Graphics_enrolled', {
        title: '3D Graphics',
        css: 'Graphics_enrolled',
        user: req.user

    })
        }
    }
        return res.render('Graphics', {
            title: '3D Graphics',
            css: 'Graphics',
            user: req.user

        })

});
router.post('/', checkFunc.checkAuth,async (req,res)=>{
    user= req.user;
    req.user.Courses.push("Graphics");
    user=await user.save();
    return res.render('Graphics_enrolled', {
        title: '3D Graphics',
        css: 'Graphics_enrolled',
        user: req.user

    })
});
module.exports = router;
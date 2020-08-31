const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {

    if(req.user && req.user.Courses){
        let obj = req.user.Courses.find(obj => obj === "Machine");
        if(obj){
            return res.render('Machine_enrolled', {
                title: 'Machine Learning',
                css: 'Machine_enrolled',
                user: req.user
        
            })
        }
    }
        return res.render('Machine', {
            title: 'Machine Learning',
            css: 'Machine',
            user: req.user,
        })

});
router.post('/', checkFunc.checkAuth,async (req,res)=>{
    user= req.user;
    req.user.Courses.push("Machine");
    user=await user.save();
    return res.render('Machine_enrolled', {
        title: 'Machine Learning',
        css: 'Machine_enrolled',
        user: req.user

    })
});
module.exports = router;
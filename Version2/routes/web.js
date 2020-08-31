const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {

    if(req.user && req.user.Courses){
        let obj = req.user.Courses.find(obj => obj === "Web");
        if(obj){
            return res.render('web_enrolled', {
                title: 'Web Development',
                css: 'web_enrolled',
                user: req.user
        
            })
        }
    }
        return res.render('Web', {
            title: 'Web Development',
            css: 'Web',
            user: req.user,
        })

});
router.post('/', checkFunc.checkAuth,async (req,res)=>{
    user= req.user;
    req.user.Courses.push("Web");
    user=await user.save();
    return res.render('web_enrolled', {
        title: 'Web Development',
        css: 'web_enrolled',
        user: req.user

    })
});

module.exports = router;
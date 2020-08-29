const router = require('express').Router();
const User = require('../models/User');

router.get('/:username',async (req, res) => {
    try{
        usery = await User.findOne({username: req.params.username});
        usery.confirmed=true;
        usery= await usery.save();
        return res.render('confirmation', {
            title: 'Confirmation',
            css: 'confirmation',
            user: req.user,
            message: req.flash('message')
    
        })
    }
   catch (err){
    console.log(err);
   }
});



module.exports = router;
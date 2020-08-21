const router = require('express').Router();
const User = require('../models/User');
const passport=require('passport');

checkAuthenticated= (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('primary','You must log in first')
    res.redirect('/log_in')
};

// GET /users/username/edit-profile
router.get('/',checkAuthenticated, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }

        res.render('edit-profile', {
            title: 'Edit/',
            css: "edit-profile",
            user: user
        });
    } catch (err) {
        return console.log(err);
    }
});

//If all this is removed nothing will damage
router.post('/', checkAuthenticated,async (req,res)=>{

    const user = await User.findOne({ username: req.params.username });

    const Name = req.body.name;
    const job = req.body.job;
    const bio = req.body.bio;

    User.findOneAndUpdate({username: req.params.username},
  {$set:{job: job,bio: bio, name: Name}},
    {new: true},
    (err,doc)=>{
        if (err) {
            console.log("Something wrong when updating data!");
        }
    }
    );
    res.render('user-profile', {
        title: user.name,
        css: "user-profile",
        user: user
    });
});

module.exports = router;

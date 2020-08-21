const router = require('express').Router();
const User = require('../models/User');
const passport=require('passport');
const checkFunc=require('../checkFunc');
const pass_conf=require('../passport-config');


// GET/username
router.get('/',checkFunc.checkAuth,  async (req, res) => {
     
    try {
       
        const curr_user = await User.findOne({ username: req.user.username });

        if (!curr_user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }

        res.render('user-profile', {
            title: curr_user.name,
            css: "user-profile",
            user: curr_user
        });
    } catch (err) {
        return console.log(err);
    }
});
// GET/username/edit-profile
router.get('/edit-profile',checkFunc.checkAuth, async (req, res) => {
    try {
        // const user = await User.findOne({ username: req.params.username });
        const user=pass_conf.curr_user;
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


router.post('/edit-profile', checkFunc.checkAuth, async (req,res)=>{

    const user = await User.findOne({ username: req.params.username });

    const Name = req.body.name;
    const job = req.body.job;
    const bio = req.body.bio;

//     User.findOneAndUpdate({username: req.params.username},
//   {set:{job: job,bio: bio, name: Name}},
//     {new: true},
//     (err,doc)=>{
//         if (err) {
//             console.log("Something wrong when updating data!");
//         }
//     }
//     );
    user.name=Name;
    user.job=job;
    user.bio=bio;
    res.redirect('/users/'+ user.username);
});

module.exports = router;

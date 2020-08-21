const router = require('express').Router();
const User = require('../models/User');
const passport=require('passport');
const checkFunc=require('../checkFunc');

// GET /users
router.get('/',checkFunc.checkAuth, async (req, res) => {
    try {
        const users = await User.find({});

        res.render('users', {
            title: "Users",
            css: "users",
            users: users
        });
    } catch (err) {
        return console.log(err);
    }
});

// GET /users/username
router.get('/:username',checkFunc.checkAuth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const curr_user=await User.findOne({ username: req.user.username })
        if(user.username !==curr_user.username){
            req.flash('danger', "You can't access others profiles!")
            return res.redirect('/')
        }
        if (!user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }

        {
           return res.render('user-profile', {
                title: user.name,
                css: "user-profile",
                user: user
        }   
    );}
        res.redirect('users');

    } catch (err) {
        return console.log(err);
    }
});

//GET /users/username/Edit
router.get('/:username/edit-profile',checkFunc.checkAuth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const curr_user=await User.findOne({ username: req.user.username })
        if(user.username !==curr_user.username){
            req.flash('danger', "You can't edit others profiles!")
            return res.redirect('/')
        }

        if (!user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }

        res.render('edit-profile', {
            title: 'Edit/'+ user.name,
            css: "edit-profile",
            user: user
        });
    } catch (err) {
        return console.log(err);
    }
});

router.post('/:username/edit-profile', checkFunc.checkAuth, async (req,res)=>{

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
const router = require('express').Router();
const { checkAuth } = require('../functions');
const checkFunc = require("../functions");
const User = require('../models/User');

// router.get('/', checkFunc.checkAuth, (req, res) => {
//     return res.render('user-profile', {
//         title: 'user-profile',
//         css: 'user-profile',
//         header: 'header_out'
//     })
// });

router.get('/:username', checkFunc.checkAuth, async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }
        res.render('user-profile', {
            title: user.username,
            css: "user-profile",
            user: user,
            header: 'header_out'
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

    user.name=Name;
    user.job=job;
    user.bio=bio;
    res.redirect('/users/'+ user.username);
});


module.exports = router;
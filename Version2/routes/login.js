const router = require('express').Router();
const passport = require('passport');
const checkFunc = require('../functions');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/', checkFunc.checkNotAuth, (req, res) => {


    return res.render('login', {
        title: 'Log In',
        css: 'login',
        message: req.flash('message')

    })
});


// router.post('/',
// async(req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     try {
//         let user = await User.findOne({ username: username });

//         if (!user) {
//             req.flash('message', 'Wrong username');
//             return res.redirect('/login');
//         }

//         const correctPassword = await bcrypt.compare(password, user.password);

//         if (!correctPassword) {
//             req.flash('message', 'Wrong password');
//             return res.redirect('/login');
//         }
//         // console.log(req.user);
//         // req.flash('message', 'Auth');
//         // req.isAuthenticated()=true;

//         console.log(req.isAuthenticated());

//         res.redirect('user-profile/' + user.username);

//     } catch (err) {
//         return console.error(err);
//     }
// });

router.post('/', passport.authenticate('local', {
    // successRedirect: '/user-profile/' + user.username,
    failureRedirect: '/Register',
    failureFlash: true
}));

router.post('/', async(req, res) => {
    const username = req.body.username;
    let user = await User.findOne({ username: username });
    res.redirect('user-profile/' + user.username);
})



module.exports = router;
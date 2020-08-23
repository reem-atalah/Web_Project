const router = require('express').Router();
const checkFunc = require("../functions");

router.get('/', (req, res) => {

    console.log(checkFunc.check );
    console.log(checkFunc.auth);

    if (checkFunc.check ) {
        return res.render('Home', {
            title: 'Home',
            css: 'style',
            RegisterOrProfileLink: 'Register',
            RegisterOrProfile: 'Register',
            loginOrOut: 'login',
            log:'Log In',
            message : req.flash('message')
        })
    }
    if (checkFunc.check ) {
        return res.render('Home', {
            title: 'Home',
            css: 'style',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'Your Profile',
            loginOrOut: 'logout',
            log:'Log Out',
            message : req.flash('message')
        })
    }

 });

// router.get('/',checkFunc.checkAuth, (req, res) => {
//     console.log('hi');
//     return res.render('Home', {
//         title: 'Home',
//         css: 'style',
//         RegisterOrProfileLink: 'user-profile',
//         RegisterOrProfile: 'Your Profile',
//         loginOrOut: 'logout',
//         log:'Log Out',
//         message : req.flash('message')
//     })
// });
// router.get('/',checkFunc.checNotkAuth, (req, res) => {
//     console.log('bye');
//     return res.render('Home', {
//         title: 'Home',
//         css: 'style',
//         RegisterOrProfileLink: 'Register',
//         RegisterOrProfile: 'Register',
//         loginOrOut: 'login',
//         log:'Log In',
//         message : req.flash('message')
//     })

// });
module.exports = router;
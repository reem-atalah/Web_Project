const router = require('express').Router();
const { checkAuth } = require('../functions');
const checkFunc = require("../functions");
const User = require('../models/User');
const path = require('path');
const multer = require('multer');

// router.get('/:username', async(req, res) => {
//     try {
//         const user = await User.findOne({ username: req.params.username });

//         if (!user) {
//             req.flash('message', 'There is no such user')
//             return res.redirect('/register');
//         }
//         res.render('/edit-profile', {
//             title: user.username + "/edit-profile",
//             css: "user-profile",
//             user: user,
//             header: 'header_out'
//                 // RegisterOrProfileLink: 'user-profile',
//                 // RegisterOrProfile: 'My profile',
//                 // loginOrOut: 'logout',
//                 // log: 'Log Out'
//         });
//     } catch (err) {
//         return console.log(err);
//     }
// });

// GET/username/edit-profile
router.get('/:username', checkFunc.checkAuth, async(req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        // const user=pass_conf.curr_user;
        if (!user) {
            req.flash('message', 'There is no such user')
            return res.redirect('/register');
        }

        res.render('edit-profile', {
            title: 'Edit/' + user.username,
            css: "edit-profile",
            user: user,
            message: req.flash('message')
        });
    } catch (err) {
        return console.log(err);
    }
});


router.post('/:username', checkFunc.checkAuth, async(req, res) => {

    try {
        const user = await User.findOne({ username: req.params.username });
        USERNAME = user.username;
        // console.log(user);
        //set storage engine
        const storage = multer.diskStorage({
            destination: "./public/images/user-pic/",
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now() +
                    path.extname(file.originalname));
            }
        });

        const upload = multer({
            storage: storage,
            limits: { fileSize: 1000000 }, //1 million bit, 1Mb
            // fileFilter: (req,file,cb)=>{
            //     checkFileType(file,cb)
            // }

        }).single('userImg');

        //allowed extension
        // checkFileType = (file,cb)=>{
        //     const filetypes= /jpeg|jpg|png|gif/ ; 
        //     const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
        //     const mimeType= filetypes.test(file.mimeType);
        //     if (mimeType && extname){
        //         return cb(null, true);
        //     }
        //     else{
        //         req.flash("Error: Images Only !")
        //     }
        // }

        upload(req, res, async(err) => {
            if (err) {
                req.flash('message', 'Error in uploading image');
                res.redirect('/user-profile/' + USERNAME);
            }
            
            // if (req.file === undefined) {
            //     req.flash('message', 'Error: No File Selected')

            // }
            if (req.file) {
                // console.log(req.file);
                file = './public/images/user-pic/' + req.file.filename
                user.image = req.file.filename

            }

            if (req.body.input_bio) {
                user.bio = req.body.input_bio

            }
            if (req.body.input_name) {
                user.username = req.body.input_name;

            }
            await user.save()

            res.redirect('/user-profile/' + user.username);
        });


        // const img = req.body.input_image;
        //console.log(img + " " + Name + " " + bio);
        // user.image = img;

        //console.log(user.image + " " + user.username + " " + user.bio)
        // res.render('user-profile', {
        //     title: user.username,
        //     css: "user-profile",
        //     user: user,
        //     message: req.flash('message')
        // });
    } catch (err) {
        return console.log(err);
    }

});

module.exports = router;
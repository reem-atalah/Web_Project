const router = require('express').Router();
const { checkAuth } = require('../functions');
const checkFunc = require("../functions");
const User = require('../models/User');
const path = require('path');
const multer=require('multer');

// router.get('/', checkFunc.checkAuth, (req, res) => {
//     return res.render('user-profile', {
//         title: 'user-profile',
//         css: 'user-profile',
//         user: req.user,
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
            message: req.flash
        });
    } catch (err) {
        return console.log(err);
    }


});

// GET/username/edit-profile
router.get('/:username/edit-profile',checkFunc.checkAuth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username });
        // const user=pass_conf.curr_user;
        if (!user) {
            req.flash('danger', 'There is no such user')
            return res.redirect('/register');
        }

        res.render('edit-profile', {
            title: 'Edit/'+ user.username,
            css: "edit-profile",
            user: user,
            message: req.flash
        });
    } catch (err) {
        return console.log(err);
    }
});


router.post('/:username/edit-profile', checkFunc.checkAuth, async (req,res)=>{

    const user = await User.findOne({ username: req.params.username });
    console.log(user);

    const Name = req.body.name;
    const bio = req.body.bio;

    //set dtorage engine
    const storage= multer.diskStorage({
    destination: "./public/images/user-pic/",
    filename: (req, file ,cb)=>{
        cb(null,file.fieldname+ '-' + Date.now()+
        path.extname(file.originalname));
    }
});
    //allowed extension
    checkFileType = (file,cb)=>{
        const filetypes= /jpeg|jpg|png|gif/ ; 
        const extname= filetypes.test(path.extname(file.originalname));
        const mimeType= filetypes.test(file.mimeType);
        if (mimeType && extname){
            return cb(null, true);
        }
        else{
            cb("Error: Images Only !")
        }
    }
    const upload =multer({
        storage:storage,
        limits: {fileSize: 1000000}, //1 million bit, 1Mb
        fileFilter: (req,file,cb)=>{
            checkFileType(file,cb)
        }
    }).single('userImg');
    
    upload(req,res, (err)=>{
        if(err){
            req.flash('message', 'Error in uploading image' );
            res.redirect('/'+ user.username);
        }
        else{
           if(req.file === undefined){
            req.flash('message', 'Error: No File Selected')
            res.render('/:username/edit-profile')
           }else{
            res.render('/:username/edit-profile')
           }
        }
    })

    const img=req.body.imagePath;

    user.username=Name;
    user.bio=bio;
    user.image=img;

    console.log(user);
    console.log(user.image+" " + user.username+" "+ user.bio)
    res.redirect('/contact');
});


module.exports = router;
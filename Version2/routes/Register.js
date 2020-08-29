//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const router = require('express').Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const checkFunc = require("../functions");
const emailCheck = require('email-check');
const nodemailer = require('nodemailer');

router.get('/', checkFunc.checkNotAuth, (req, res) => {
    return res.render('Register', {
        title: 'Register',
        css: 'Register',
        message: req.flash('message')
    })

});
const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com', //smtp.gmail.com
    // port: 587,
    // secure: false,
    service: 'gmail',
    auth: {
        user: 'ccraftsa@gmail.com',
        pass: 'klvjfoljhyxqzrtp'
    }
});

router.post('/', checkFunc.checkNotAuth, async(req, res) => {

    const userName = req.body.username;
    const Email = req.body.email;
    const pass = req.body.password;
    const conf_pass = req.body.confirm_password;
    const gend = req.body.genderList;

    var er = 0;

    if (userName.length < 4 || userName.length > 50) {
        er = er + 1;
        req.flash('message', 'username should be at least 4 characters long and not more than 50');
    }

    if (pass.length < 7 || pass.length > 50) {
        er = er + 1;
        req.flash('message', 'password should be at least 7 characters long and not more than 50');
    }

    if (conf_pass !== pass) {
        er = er + 1;
        req.flash('message', 'Passwords are not equal');
    }

    if (er > 0) {
        return res.render('Register', {
            title: "Register",
            css: "Register",
            message: req.flash('message'),
            email: Email,
            genderList: gend
        });
    }

    try {
        let user = await User.findOne({ username: userName });

        if (user) {
            req.flash('message', 'Username is arleady taken')
            return res.render('Register', {
                title: "Register",
                css: "Register",
                message: req.flash('message'),
                // errors: errors, 
                email: Email,
                genderList: gend
            });
        };

        user = await User.findOne({ email: Email });

        if (user) {
            req.flash('message', 'Email is already registered');
            return res.render('Register', {
                title: "Register",
                css: "Register",
                message: req.flash('message'),
                // errors: errors, 
                username: userName,
                genderList: gend
            })
        }

        user = new User({
            username: userName,
            email: Email,
            password: pass,
            gender: gend
        });
        user = await user.save();
        //   console.log('User Created: \n ${user.userName}');

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        user = await user.save();
        id = user._id;
        await transporter.sendMail({
            from: "ccraftsa@gmail.com", // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "C-Craft Confirmation e-mail", // Subject line
            html: `<div style="background-color: rgb(83, 44, 83, 0.6);text-align:center; height: fit-content;width: fit-content; border-radius:5px;
            display: flex;justify-content: space-between;align-items: center;flex-direction: column; padding:25px 25px 25px 25px;color:white;"><h3 style=" font-family: Arial, 'Arial Narrow', 'Franklin Gothic Medium', sans-serif; font-weight:bolder;">
            Hi ${req.body.username}<br/>
            Click here to verify your account <br/>
            </h3>

            <a href='http://localhost:8080/confirmation/${req.body.username}' ><button style=" background:linear-gradient(to bottom, #3366cc 0%, #990099 100%);border-radius:5px; border:none;
            width:fit-content;height:fit-content;margin:20px 30px 30px 30px; padding:20px 20px 20px 20px; color: #aaa; ">Verify</button></a></div>`, // html body
        })
        req.flash('message', 'You registered successfully, Check your email.');
        res.redirect('/login');

    } catch (err) {
        return console.log(err);
    }

});



module.exports = router;
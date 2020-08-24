const router = require('express').Router();
const nodemailer = require('nodemailer');
const checkFunc = require('../functions');
const bcrypt = require('bcryptjs');
router.get('/', (req, res) => {
    return res.render('contact', {
        title: 'Contact Us',
        css: 'contact',
        RegisterOrProfileLink: 'Register',
        RegisterOrProfile: 'Register',
        loginOrOut: 'login',
        log: 'Log in'
    })
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: 'mennaahmedali77@gmail.com',
        pass: '12345mm'
    }
});

// // POST contact us page
router.post('/', (req, res) => {
    transporter.sendMail({
        from: 'ahmecd@gmail.com',
        to: 'mennaahmedali77@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    });
    req.flash('success', 'Your message has been sent!');
    res.redirect('/contact');

});

module.exports = router;
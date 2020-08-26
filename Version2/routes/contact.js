const router = require('express').Router();
const nodemailer = require('nodemailer');
const checkFunc = require('../functions');
const bcrypt = require('bcryptjs');
router.get('/', (req, res) => {
    return res.render('contact', {
        title: 'Contact Us',
        css: 'contact',
        user: req.user,
        message: req.flash('message')

    })
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //smtp.gmail.com
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: 'reem.atalah1@gmail.com',
        pass: ''
    }
});

// // POST contact us page
router.post('/', (req, res) => {
    transporter.sendMail({
        from: 'reem.atalah1@gmail.com',
        to: 'mennaahmedali77@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    });
    req.flash('message', 'Your message has been sent!');
    res.redirect('/contact');

});

module.exports = router;
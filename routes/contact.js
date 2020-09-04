process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
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
    auth: {
        user: 'ccraftsa@gmail.com',
        pass: 'klvjfoljhyxqzrtp'
    }
});

// POST contact us page
router.post('/', async(req, res) => {
    try {
        await transporter.sendMail({
            from: `${req.body.username} < ${req.body.email}>`,
            to: `ccraftsa@gmail.com`,
            // from: `${req.body.username} < ${req.body.username}>`, // sender address
            // to: "mennaahmedali77@gmail.com, reem.atalah1@gmail.com", // list of receivers
            subject: `${req.body.subject}`, // Subject line
            text: `${req.body.message}` // plain text body

        })

    } catch (err) {
        console.log(err)

    }
    req.flash('message', 'Your message has been sent!');
    res.redirect('/contact');

});


module.exports = router;

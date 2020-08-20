const router = require('express').Router();
const nodemailer = require('nodemailer');
const checkFunc = require('../functions');

router.get('/', (req, res) => {

    if (checkFunc.checkNotAuth) {
        return res.render('contact', {
            title: 'Contact Us',
            css: 'contact',
            RegisterOrProfileLink: 'Register',
            RegisterOrProfile: 'Register',
            loginOrOut: 'login',
            log:'Log In'
        })
    }
    if (checkFunc.checkAuth) {
        return res.render('contact', {
            title: 'Contact Us',
            css: 'contact',
            RegisterOrProfileLink: 'user-profile',
            RegisterOrProfile: 'Your Profile',
            loginOrOut: 'Home',
            log:'Log Out'
        })
    }
});

// router.post('/', (req, res) => {
//     // $('#contact_form').submit((e)=>{
//     //     var name=document.getElementById('N'),
//     //      email=document.getElementById('Email'),
//     //      messages=document. getElementById('message');

//     //     if(!name.value || !email.value || !messages.value){
//     //         req.flash("danger","Please fill all entries !");
//     //     }
//     //     else{
//     //         $ajax({
//     //             url:"https://formspree.io/reem.atalah1@gmail.com",
//     //             method:"POST",
//     //             data: $(this).serialize(),
//     //             dataType: "json"
//     //         })
//     //         e.preventDefault()
//     //         $(this).get(0).reset()
//     //         req.flash("sucess","Your message has sent successfuly !");
//     //     }
//     // })

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'reem.atalah1@gmail.com',
//             pass: 'reemreem12345'
//         }
//     });

//     const mailOptions = {
//         from: 'reem.atalah1@gmail.com',
//         to: 'reem.atalah1@gmail.com',
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//     };

//     transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//             req.flash("sucess", "Message has sent");
//         }
//     });
//     res.redirect('/confirmation');
// })

module.exports = router;
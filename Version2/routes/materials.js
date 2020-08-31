const router = require('express').Router();
const nodemailer = require('nodemailer');
const checkFunc = require('../functions');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    return res.render('materials', {
        title: 'Materials',
        css: 'materials',
        user: req.user,
        message: req.flash('message')

    })
});


module.exports = router;
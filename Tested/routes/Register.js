const router = require('express').Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const checkFunc=require("../functions");
const emailCheck = require('email-check');

router.get('/',checkFunc.checkNotAuth, (req, res) => {
    res.render('Register', {
        title: 'Register',
        css: 'Register'
    })
});

router.post('/', [
    body('email', 'Invalid Email Address').exists().isEmail(),
    body('password', 'Invalid Password').exists().isLength({ min: 5 }),
    body('confirm_password','Passwords do not match').not().equals(body('password')),
    body('username')
      .exists()
      .isAlphanumeric().withMessage('username should be alphanumeric')
      .isLength({ min: 1, max: 50 }).withMessage('username should not be empty, should be more than one and less than 50 character')
      .trim()
  ], async (req, res) => {
    const userName = req.body.username;
    const Email = req.body.email;
    const pass = req.body.password;
    const conf_pass = req.body.confirm_password;
    const gend=req.body.genderList;
 
    //will get Array of errors
    const errors = validationResult(req).errors; //instead of req.validationErrors().errors
  
    if (errors.length) {
      return res.render('Register', {
          title: "Register",
          css: "Register",
          errors: errors, //first errors in template (ejs), second errors in if condition in line 52
          username: userName,
          email: Email,
          genderList: gend
      })
  }
  
    try {
      let user = await User.findOne({ username: userName });
  
      if (user) {
        req.flash('danger', 'Username is arleady taken')//danger to make the message red
        return res.render('Register', {
          title: "Register",
          css: "Register",
          errors: errors, 
          email: Email,
          genderList: gend
      });
      };
  
      user = await User.findOne({ email: Email });
  
          if (user) {
              req.flash('danger', 'Email is already registered');
              return res.render('Register', {
                title: "Register",
                css: "Register",
                errors: errors, 
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
  
          req.flash('success', 'You registered successfully');//success for green alert ^_^
          res.redirect('/login');
    } 
    catch (err) {
      return console.log(err);
    }
  
  });
  
  

module.exports = router;
const router = require('express').Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const checkFunc=require("../functions");
const emailCheck = require('email-check');

router.get('/',checkFunc.checkNotAuth, (req, res) => {
  return res.render('Register' , {
        title: 'Register',
        css: 'Register',
        RegisterOrProfileLink: 'Register',
        RegisterOrProfile: 'Register',
        loginOrOut: 'login',
        log:'Log In',
        message : req.flash('message')
      })
      
});

router.post('/',
  //[ body('username', req.flash('message','username is missing')).notEmpty(),
  // body('username', req.flash('message','username should be at least 5 characters long')).isLength({ min: 5 }),
  // body('username', req.flash('message','username should not be more than 200 characters long')).isLength({ max: 200 }),
  // body('email', req.flash('message','email is missing')).notEmpty(),
  // body('email', req.flash('message','Please enter a valid email')).isEmail(),
  // body('password', req.flash('message','password is missing')).notEmpty(),
  // body('password', req.flash('message','password should be at least 7 characters long')).isLength({ min: 7 }),
  // body('password', req.flash('message','password should not be more than 200 characters long')).isLength({ max: 200 }),
  // body('confirm_password', req.flash('message','confirm password is missing')).notEmpty(),
  // body('confirm_password', req.flash('message','Passwords are not equal')).not().equals('password')],
   async (req, res) => {
        
    // if (!(body('username').notEmpty())){
    //   req.flash('message','username is missing')
    // }
    // if(body('username').isLength({ min: 5 })){
    //   req.flash('message','username should be at least 5 characters long');
    // }
    if(body('username').isLength({ max: 200 }) ){
      req.flash('message','username should not be more than 200 characters long')
    }

    const userName = req.body.username;
    const Email = req.body.email;
    const pass = req.body.password;
    const conf_pass = req.body.confirm_password;
    const gend=req.body.genderList;

    //will get Array of errors
    const errors = validationResult(req).errors; //instead of req.validationErrors().errors
    
    // if(req.body('email').notEmpty()){
    //   req.flash('message','email is missing')
    // }
    // if(req.body('email').isEmail()){
    //   req.flash('message','Please enter a valid email')
    // }
    // if(req.body('password').notEmpty()){
    //   req.flash('message','password is missing')
    // }
    // if(body('password').isLength({ min: 7 })){
    //   req.flash('message','password should be at least 7 characters long')
    // }
    // if(body('password').isLength({ max: 200 })){
    //   req.flash('message','password should not be more than 200 characters long')
    // }
    // if(body('confirm_password').notEmpty())
    // {
    //   req.flash('message','confirm password is missing')
    // }
    // if(body('confirm_password' ).not().equals('password')){
    //   req.flash('message','Passwords are not equal')
    // }
    if (errors.length) {
      return res.render('Register', {
          title: "Register",
          css: "Register",
          RegisterOrProfileLink: 'Register',
          RegisterOrProfile: 'Register',
          loginOrOut: 'login',
          log:'Log In',
          message : req.flash('message'),
          errors: errors, //first errors in template (ejs), second errors in if condition in line 52
          username: userName,
          email: Email,
          genderList: gend
      })
  }
  
    try {
      let user = await User.findOne({ username: userName });
  
      if (user) {
        req.flash('message', 'Username is arleady taken')
        return res.render('Register', {
          title: "Register",
          css: "Register",
          RegisterOrProfileLink: 'Register',
          RegisterOrProfile: 'Register',
          loginOrOut: 'login',
          log:'Log In',
          message : req.flash('message'),
          errors: errors, 
          email: Email,
          genderList: gend
      });
      };
  
      user = await User.findOne({ email: Email });
  
          if (user) {
              req.flash('message','Email is already registered');
              return res.render('Register', {
                title: "Register",
                css: "Register",
                RegisterOrProfileLink: 'Register',
                RegisterOrProfile: 'Register',
                loginOrOut: 'login',
                log:'Log In',
                message : req.flash('message'),
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
  
          req.flash('message', 'You registered successfully');//success for green alert ^_^
          res.redirect('/login');
    } 
    catch (err) {
      return console.log(err);
    }
  
  });
  
  

module.exports = router;
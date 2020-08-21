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

router.post('/',async (req, res) => {
 
    const userName = req.body.username;
    const Email = req.body.email;
    const pass = req.body.password;
    const conf_pass = req.body.confirm_password;
    const gend=req.body.genderList;

    var er=0;

    if(userName.length < 4 || userName.length > 50){
      er=er+1;
      req.flash('message','username should be at least 4 characters long and not more than 50');
  }

    if(pass.length < 7 || pass.length > 50){
      er=er+1;
      req.flash('message','password should be at least 7 characters long and not more than 50');
  }

    if(conf_pass !== pass){
      er=er+1;
      req.flash('message','Passwords are not equal');
  }

  if(er > 0){
      return res.render('Register', {
        title: "Register",
        css: "Register",
        RegisterOrProfileLink: 'Register',
        RegisterOrProfile: 'Register',
        loginOrOut: 'login',
        log:'Log In',
        message : req.flash('message'),
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
          RegisterOrProfileLink: 'Register',
          RegisterOrProfile: 'Register',
          loginOrOut: 'login',
          log:'Log In',
          message : req.flash('message'),
          // errors: errors, 
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
  
          req.flash('message', 'You registered successfully');//success for green alert ^_^
          res.redirect('/login');
    } 
    catch (err) {
      return console.log(err);
    }
  
  });
  
  

module.exports = router;
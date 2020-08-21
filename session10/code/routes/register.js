const mongoose = require('mongoose');
const User = require('../models/User');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


checkNotAuthenticated= (req,res,next)=>{
  if(! req.isAuthenticated()){
      return next()
      
  }
  req.flash('info', 'You are arleady logged in')
  res.redirect('/')
};

router.get('/',checkNotAuthenticated, (req, res) => {
  res.render('register', {
    title: "Register", //locals, used in views //to change the title of the page in the header
    css: "style",//to change the css in the header
    //errors: null //type to get errors to the user
  });

});

//make array[] between the url and (res,req) 
router.post('/', [
  body('email', 'Invalid Email Address').exists().isEmail(),
  body('password', 'Invalid Password').exists().isLength({ min: 5 }),
  body('confirm_password','Passwords do not match').not().equals(body('password')),
  body('firstname')
    .exists()
    .isAlphanumeric().withMessage('firstName should be alphanumeric')
    .isLength({ min: 1, max: 50 }).withMessage('firstName should not be empty, should be more than one and less than 50 character')
    .trim(),
  body('lastname')
    .exists()
    .isAlphanumeric().withMessage('lastName should be alphanumeric')
    .isLength({ min: 1, max: 50 }).withMessage('lastName should not be empty, should be more than one and less than 50 character')
    .trim(),
  body('username')
    .exists()
    .isAlphanumeric().withMessage('username should be alphanumeric')
    .isLength({ min: 1, max: 50 }).withMessage('username should not be empty, should be more than one and less than 50 character')
    .trim()
], async (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const userName = req.body.username;
  const Email = req.body.email;
  const pass = req.body.password;
  const conf_pass = req.body.confirm_password;

  /*
  * This if condition should be removed as the above validations satisfy the same thing
  */
  // if (!firstName || !lastName || !userName || !Email || !pass || !conf_pass || conf_pass !== pass)
  //   return res.redirect('/register');

  //will get Array of errors
  const errors = validationResult(req).errors; //instead of req.validationErrors().errors

  if (errors.length) {
    return res.render('register', {
        title: "Register",
        css: "style",
        errors: errors, //first errors in template (ejs), second errors in if condition in line 52
        firstname: firstName,
        lastname: lastName,
        username: userName,
        email: Email
    })
}

  try {
    let user = await User.findOne({ username: userName });

    if (user) {
      req.flash('danger', 'Username is arleady taken')//danger to make the message red
      return res.render('register', {
        title: "Register",
        css: "style",
        errors: errors, //first errors in template (ejs), second errors in if condition in line 52
        firstname: firstName,
        lastname: lastName,
        username: userName,
        email: Email
    })
    }

    user = await User.findOne({ email: Email });

        if (user) {
            req.flash('danger', 'Email is already registered');
            return res.render('register', {
              title: "Register",
              css: "style",
              errors: errors, //first errors in template (ejs), second errors in if condition in line 52
              firstname: firstName,
              lastname: lastName,
              username: userName,
              email: Email
          })
        }

    user = new User({
      name: firstName + " " + lastName,
      username: userName,
      email: Email,
      password: pass
    });
    user = await user.save();
    console.log('User Created: \n ${user.userName}');

    const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;

        user = await user.save();

        req.flash('success', 'You registered successfully');//success for green alert ^_^
        res.redirect('/log_in');
  } 
  catch (err) {
    return console.log(err);
  }

});


module.exports = router;

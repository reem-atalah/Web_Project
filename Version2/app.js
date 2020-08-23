const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flush=require('connect-flash');
const passport = require('passport');
const User = require('./models/User');
const override = require('method-override');
const nodemailer = require('nodemailer');
const cron = require("node-cron");
const checkFunc = require('./functions');
const pass_conf = require('./passport-config');
const app = express();
const port = 8080;


mongoose.connect('mongodb://localhost/student_activity', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('connected to DB');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
//body-parser middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(flush());

//Authentication
pass_conf(passport);
app.use(passport.initialize());
app.use(passport.session());

//flash messages middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//logOut
app.use(override('_method'));
app.delete('/logout', checkFunc.checkAuth, (req, res) => {
    req.logOut();
    req.flash('message', 'You have logged out successfully');
    return res.render('home', {
        title: 'Home',
        css: 'home',
        RegisterOrProfileLink: 'Register',
        RegisterOrProfile: 'Register',
        loginOrOut: 'login',
        log:'Log In',
        message : req.flash('message')
    })
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

            return res.render('Home', {
                title: 'Home',
                css: 'style',
                RegisterOrProfileLink: 'Register',
                RegisterOrProfile: 'Register',
                loginOrOut: 'login',
                log:'Log In',
                message : req.flash('message')
            })
    });

// app.get('/',checkFunc.checkAuth, (req, res) => {
//         console.log('hi');
//         return res.render('Home', {
//             title: 'Home',
//             css: 'style',
//             RegisterOrProfileLink: 'user-profile',
//             RegisterOrProfile: 'Your Profile',
//             loginOrOut: 'logout',
//             log:'Log Out',
//             message : req.flash('message')
//         })
//     });
// app.get('/',checkFunc.checNotkAuth, (req, res) => {
//         console.log('bye');
//         return res.render('Home', {
//             title: 'Home',
//             css: 'style',
//             RegisterOrProfileLink: 'Register',
//             RegisterOrProfile: 'Register',
//             loginOrOut: 'login',
//             log:'Log In',
//             message : req.flash('message')
//         })
    
// });

app.use('/Home', require('./routes/Home'));
app.use('/Register', require('./routes/Register'));
app.use('/login', require('./routes/login'));
app.use('/contact', require('./routes/contact'));
app.use('/confirmation', require('./routes/confirmation'));
app.use('/user-profile', require('./routes/user-profile'));
app.use('/Machine', require('./routes/Machine'));
app.use('/Embedded', require('./routes/Embedded'));
app.use('/Web', require('./routes/Web'));
app.use('/Graphics', require('./routes/Graphics'));

app.use('/deleteAll', async (req, res) => {
    User.deleteMany({}, err => {
        if (err) return console.log(err);
    });
    // return res.render('Home', {
    //     title: 'Home',
    //     css: 'style',
    //     RegisterOrProfileLink: 'Register',
    //     RegisterOrProfile: 'Register',
    //     loginOrOut: 'login',
    //     log:'Log In',
    //     message : req.flash('message')
    // })
    return res.redirect('/');
});


app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`server started listening at ${port}`);
});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
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

//Authentication
pass_conf.initialize(passport);
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
    req.flash('secondary', 'You have logged out successfully');
    res.render('home', {
        title: 'Home',
        css: 'home'
    })
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
//body-parser middleware
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('Home', {
        title: 'Home',
        css: 'style'
    })
});

app.use('/Home', require('./routes/Home'));
app.use('/Register', require('./routes/Register'));
app.use('/login', require('./routes/login'));
app.use('/contact', require('./routes/contact'));
app.use('/confirmation', require('./routes/confirmation'));
app.use('/user-profile', require('./routes/user-profile'));

app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`server started listening at ${port}`);
});
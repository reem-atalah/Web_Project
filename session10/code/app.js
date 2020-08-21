const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const override=require('method-override');
const checkFunc=require('./checkFunc');
const pass_conf=require('./passport-config');
const app = express();

const port = 8000;

mongoose.connect('mongodb://localhost/session10', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('connected to DB');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //You forgot to put a "()" after bodyParser.json
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

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
app.delete('/logout',checkFunc.checkAuth,(req,res)=>{
    req.logOut();
    req.flash('secondary', 'You have logged out successfully');
    res.render('home', {
        title: 'Home',
        css: 'home'
    })
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        css: 'home'
    })
});

//Global variable 
//without any url
// app.use((req,res,next)=>{
//     res.locals.errors=null; //variable is errors
//     next();
// })

app.use('/register', require('./routes/register'));
app.use('/log_in', require('./routes/logIn'));
app.use('/users', require('./routes/users'));
app.use('/user-profile',require('./routes/user-profile'));
app.use('/edit-profile', require('./routes/edit-profile'));

app.use('/deleteAll', async (req, res) => {
    User.deleteMany({}, err => {
        if (err) return console.log(err);
    });

    res.redirect('/');
});

app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`Server is listening at port ${port}`);
});

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const override=require('method-override');
const nodemailer=require('nodemailer');
const cron=require("node-cron");
// const checkFunc=require('./checkFunc');
// const pass_conf=require('./passport-config');
const app = express();
const port = 8080;


mongoose.connect('mongodb://localhost/session10', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('connected to DB');
});

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

app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`server started listening at ${port}`);
});
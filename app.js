const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.listen(port, er => {
    if (err) return console.log(err);
    console.log(`server started listening at $(port)`);
});
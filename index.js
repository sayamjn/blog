require("dotenv").config();
const express = require('express');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

connectDB()

app.use('/', require('./routes/blog'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const path = require('path')
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const indexRouter = require('./routes/index')
const expressSession = require('express-session')
const flash = require('connect-flash');
require("dotenv").config()
const session = require('express-session');

const db = require('./config/mongoose-connection')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs');
app.use('/', indexRouter)
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);



app.listen(3000);
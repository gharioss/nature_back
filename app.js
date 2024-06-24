var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sizeRouter = require('./routes/size');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/paintings', indexRouter);
app.use('/users', usersRouter);
app.use('/size', sizeRouter);

module.exports = app;

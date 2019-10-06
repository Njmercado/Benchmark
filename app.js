var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoRouter = require('./routes/mongoDs1');
var mysqlRouter = require('./routes/mysqlDs1');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ds1/mongo', mongoRouter);
app.use('/ds1/mysql', mysqlRouter);

module.exports = app;

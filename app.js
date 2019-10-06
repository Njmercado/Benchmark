var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoDs1Router = require('./routes/mongoDs1');
var mysqlDs1Router = require('./routes/mysqlDs1');

var mongoDs2Router = require('./routes/mongoDs2');
var mysqlDs2Router = require('./routes/mysqlDs2');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ds1/mongo', mongoDs1Router);
app.use('/ds1/mysql', mysqlDs1Router);

app.use('/ds2/mongo', mongoDs2Router);
app.use('/ds2/mysql', mysqlDs2Router);


module.exports = app;

'use strict';

var express = require('express');
var app = express();

var http = require('http').Server(app);

var port = process.env.PORT || 3000;

var path = __dirname;
app.use('/', express.static(path));

http.listen(port, function () {
    console.log('Listening on: ' + port + '...');
});

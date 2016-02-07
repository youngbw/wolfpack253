var morgan = require('morgan');
var express = require('express');
app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send("Hello world!");
});

app.listen(8080);
console.log("Listening on port 8080");



module.exports = app;

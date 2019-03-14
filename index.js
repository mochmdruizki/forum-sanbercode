var express = require('express');
var app = express();
var port = 5000;

// make sure to use express.json() before require any controllers 
// in order to parse and attach the request body to req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
var routes = require('./routes/index');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}!`));
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/*", function (request, response) {
  var paramNum = +request.params[0];
  var date;
  
  if(!isNaN(paramNum)) {
    date = moment(request.params[0], "X", true);
  } else {
    date = moment(request.params[0], "MMMM D, YYYY", true);
  }
  
  if(date.isValid()) {
    response.send({
      unix: date.format("X"),
      natural: date.format("MMMM D, YYYY")
    })
  } else {
    response.send({
      unix: null,
      natural: null
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

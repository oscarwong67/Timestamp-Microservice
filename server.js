// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

const helpers = require('./helpers.js');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// the timestamp endpoint
app.get("/api/timestamp/:date_string", function (req, res) {
  const dateString = req.params.date_string;
  if (!dateString) {
    helpers.throwDateError(res);
  }
  
  let date;
  if (dateString.length === 0) {
    date = new Date();
  } else {
    if (dateString.includes('-')) {
      date = new Date(dateString);
    } else {
      date = new Date(parseInt(dateString));  //  UTC Timestamp
    }
    
  }
  
  if (date) {
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    });
  } else {
    helpers.throwDateError(res);
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
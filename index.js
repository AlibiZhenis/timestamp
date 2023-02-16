// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/", function(req, res) {
  date = new Date();
  obj = { "unix": Math.floor(date.getTime()), "utc": date.toUTCString() };
  res.json(obj);
});

app.get("/:time", function(req, res) {
  var date = req.params.time;
  if (!(date.trim())) {
    date = new Date();
  }
  else if (isNaN(date)) {
    date = new Date(date);
  }
  else {
    date = new Date(parseInt(date));
  }

  if (date.toString() == "Invalid Date") {
    obj = { error: "Invalid Date" };
  }
  else {
    obj = { "unix": Math.floor(date.getTime()), "utc": date.toUTCString() };
  }
  res.json(obj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

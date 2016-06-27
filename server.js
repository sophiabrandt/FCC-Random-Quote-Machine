// init project
const babelify = require('express-babelify-middleware');
const express = require('express');
const app = express();

//babelify
app.get('/app.js', babelify('./client/app.js', {
  cache: true,
  precompile: true,
  minify: true,
  gzip: true
  },
  {presets: ["es2015"]}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
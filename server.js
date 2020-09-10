const express = require('express')
const request = require('request')
const app = express()
const port = process.env.PORT || 3000
const key = process.env.API_KEY
const secret = process.env.API_SECRET

app.use(express.urlencoded({ extended: true }))

app.get('/tradestation', function(req, res1){
  request.post('https://api.tradestation.com/v2/Security/Authorize', {
    form: {
      grant_type: 'authorization_code',
      client_id: key,
      client_secret: secret,
      code: req.query.code,
      redirect_uri: 'http://ibm.chantzish.ga/tradestation',
      //scope: 'marketdata%20readaccount%20trade'
    }
  }, (error, res, body) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
    console.log(JSON.stringify(JSON.parse(body), null, 2));
    res1.send("<!DOCTYPE html><html><body><pre>"+JSON.stringify(JSON.parse(body), null, 2)+"</pre></body></html>");
  })
})

app.get('/curl', function(req, res){
  var htxt = "";
  for (const header in req.headers) {
    htxt += `${header}: ${req.headers[header]}` + "\n";
  };
  res.send("Request URL\n\n"+req.originalUrl+"\n\nHeaders\n\n"+htxt);
})

app.get('/', function(req, res){
  var htxt = "";
  for (const header in req.headers) {
    htxt += `<b>${header}:</b> ${req.headers[header]}` + "\n";
  };
  res.send("<!DOCTYPE html><html><body><h2>Request URL</h2><pre>"+req.originalUrl+"</pre><h2>Headers</h2><pre>"+htxt+"</pre></body></html>");
})

app.post('/post', function (req, res, next) {
  var htxt = "";
  var btxt = "";
  for (const header in req.headers) {
    htxt += `${header}: ${req.headers[header]}` + "\n";
  };
  for (const parameter in req.body) {
    btxt += `${parameter}: ${req.body[parameter]}` + "\n";
  }
  res.send("Request URL\n\n"+req.originalUrl+"\n\nHeaders\n\n"+htxt+"\n\nBody\n\n"+btxt);
})

app.post('/curl', function (req, res, next) {
  var htxt = "";
  var btxt = "";
  for (const header in req.headers) {
    htxt += `${header}: ${req.headers[header]}` + "\n";
  };
  for (const parameter in req.body) {
    btxt += `${parameter}: ${req.body[parameter]}` + "\n";
  }
  res.send("Request URL\n\n"+req.originalUrl+"\n\nHeaders\n\n"+htxt+"\n\nBody\n\n"+btxt);
})

app.post('/', function (req, res, next) {
  var htxt = "";
  var btxt = "";
  for (const header in req.headers) {
    htxt += `<b>${header}:</b> ${req.headers[header]}` + "\n";
  };
  for (const parameter in req.body) {
    btxt += `<b>${parameter}:</b> ${req.body[parameter]}` + "\n";
  }
  res.send("<!DOCTYPE html><html><body><h2>Request URL</h2><pre>"+req.originalUrl+"</pre><h2>Headers</h2><pre>"+htxt+"</pre><h2>Body</h2><pre>"+btxt+"</pre></body></html>");
})

app.listen(port)

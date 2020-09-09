const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))

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

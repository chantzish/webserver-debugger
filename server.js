const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', function(req, res){var htxt = ""; for (const header in req.headers) {
  htxt += `<b>${header}:</b> ${req.headers[header]}` + "\n";
}; return res.send("<!DOCTYPE html><html><body><h2>Headers</h2><pre>"+htxt+"</pre></body></html>");})

app.listen(port)

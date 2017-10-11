const express = require('express');
const bodyParser = require('body-parser')
const app = express();

let PORT = process.env.PORT || 3000;

app
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
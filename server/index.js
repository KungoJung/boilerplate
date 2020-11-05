const express = require('express');
const chalk = require("chalk")
const path = require('path');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const app = express()

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// Will you use api routes?
app.use('/api', require('./api')); // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
});


// Start The Server
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function () {
  console.log(chalk.cyan(`Your server is listening on port ${port}`));
});

module.exports = app

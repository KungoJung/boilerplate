const express = require('express');
const chalk = require("chalk")
const path = require('path');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { db, User } = require("./db");
const session = require("express-session");
const passport = require('passport')

const app = express();

// Keep all your app's secret API keys in a file called 'secrets.js' in the project's root. Include it in the .gitignore file too. On the production server, add these keys as environment variables, so that they can still be read by the Node process on process.env
// if (process.env.NODE_ENV !== "production") require("../secrets")

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
// This middleware gives every middleware downstream of it access to the req.session object
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  // not sure what this is so it's commented out:
  // store: sessionStorage,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
// establishes `req.user` for any middleware that runs after it
app.use(passport.session())

// ALTERNATIVE SESSION MIDDLEWARE
// We can also use connect-session-sequelize as a more resilient option for storing session information in postgres, to avoid interrupting real-world, logged-in users when redeploying our app
// // configure and create our database store
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const dbStore = new SequelizeStore({ db: db });
// // sync so that our session table gets created
// dbStore.sync();

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// Using api & auth routes?
app.use("/auth", require("./auth"));
app.use('/api', require('./api')); // include our routes!

// Static file-serving middleware
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); // send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error')
});

// Optionally, export app and move the following code into its own file (like start.js)

// Start The Server
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

// be sure to take out {force: true} in production
db.sync(  )
  .then(function () {
    app.listen(port, function () {
      console.log(chalk.cyan(`Your server is listening on port ${port}`));
    });
  });

module.exports = app

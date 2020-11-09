const router = require("express").Router();
const { User } = require("../db");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy


const verificationCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    // findOrCreate returns an array of [0] the instance and [1] whether it found or created the instance
    const [user] = await User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: {
        email: profile.emails[0].value,
        // if you use an user image in your Sequelize models, can grab from google too
        // imageUrl: profile.photos[0].value
      }
    })
    done(null, user);
  } catch (err) {
    done(err);
  }
}

// Passport Registration
// this gets triggered by the done of the verificationCallback
// happens ONCE when the user logs in via google
passport.serializeUser((user, done) => {
  // store the user.id on the session
  done(null, user.id)
});
// Gets triggered by our passport session middleware for EVERY request
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      where: { id }
    });
    // will mean that req.user is equal to the user we just found
    done(null, user);
  } catch (err) {
    done(err)
  }
})

const strategy = new GoogleStrategy({
  clientID: "1009371749996-t8o2q058u3cdufsfca5b8ceptjqadiri.apps.googleusercontent.com",
  clientSecret: "nRDXrs1EJO2bX6YiHx2tFt2y",
  callbackURL: "/auth/google/callback"
}, verificationCallback)

passport.use(strategy)

router.get("/", passport.authenticate("google", {
  scope: "email"
}));

router.get("/callback", passport.authenticate("google", {
  successRedirect: "/home",
  failureRedirect: "/"
}));


module.exports = router;

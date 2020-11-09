const router = require("express").Router();
const { User } = require("../db");

// redirect to all different auth routes here with router.use:

// router.use("/samplePath", require("./samplePath")) // matches all requests to /auth/samplePath

router.use("/google", require("./oauth.js"));

// session authenticator for logged-in user
router.get("/me", async (req, res, next) => {
  try {
    // normal auth
    if (!req.session.userId) {
      if (req.user) {
        res.json(req.user);
      } else {
        res.sendStatus(401);
      }
      // OAuth - user logged in through google, etc.
    } else {
      const user = await User.findOne({
        where: {
          id: req.session.id
        }
      });
      if (!user) {
        res.sendStatus(401);
      } else {
        res.json(user);
      }
    }
  } catch (err) {
    next(err);
  }
})

// login
router.put("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    console.log("INSIDE LOGIN ROUTE. USER:", user)
    if (!user) res.status(401).send("User not found");
    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send("Incorrect Password")
    } else {
      req.login(user, err => {
        if (err) next(err)
        else res.json(user)
      })
    }
  } catch (err) {
    next(err);
  }
});

// sign up
router.post("/signup", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    req.login(newUser, err => {
      if (err) next(err);
      else res.json(newUser)
    })
  } catch (err) {
    next(err)
  }
});

// logout
router.delete("/logout", async (req, res, next) => {
  try {
    // remove user id from the session
    delete req.session.userId;
    if (req.user) {
      // fancy passport method
      req.logout();
    }
    req.session.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
});

// 404 Handler
router.use(function (req, res, next) {
  const err = new Error("Not Found Kiddo");
  err.status = 404;
  next(err)
});

module.exports = router

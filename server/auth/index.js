const router = require("express").Router();
const { User } = require("../db");

// redirect to all different auth routes here with router.use:

// router.use("/samplePath", require("./samplePath")) // matches all requests to /auth/samplePath

// session authenticator for logged-in user
router.get("/me", (req, res, next) => {
  res.json(req.user)
})

// login
router.put("/login", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) res.status(401).send("User not found");
    else if (!user.hasMatchingPassword(req.body.password)) {
      res.status(401).send("Incorrect Password")
    } else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      })
    }
  })
  .catch(next);
})

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
})

// logout
router.delete("/logout", async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
})

// 404 Handler
router.use(function (req, res, next) {
  const err = new Error("Not Found Kiddo");
  err.status = 404;
  next(err)
})

module.exports = router

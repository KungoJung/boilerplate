const router = require("express").Router();

// redirect to all different api routes here with router.use:

// router.use("/samplePath", require("./samplePath")) // matches all requests to /api/samplePath

// 404 Handler
router.use(function (req, res, next) {
  const err = new Error("Not Found Kiddo");
  err.status = 404;
  next(err)
})

module.exports = router

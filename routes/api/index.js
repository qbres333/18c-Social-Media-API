// Import router function from Express library (create router instance)
const router = require("express").Router();
// import routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require("./thoughtRoutes");

// mount the routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
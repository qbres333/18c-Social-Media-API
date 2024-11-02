// Import router function from Express library (create router instance)
const router = require('express').Router();
// import api routes
const apiRoutes = require('./api');
// mount api path to the router
router.use('/api', apiRoutes);
// send error msg if any route other than pre-defined route is requested
router.use((req, res) => res.send('Wrong route!'));
// export router object
module.exports = router;
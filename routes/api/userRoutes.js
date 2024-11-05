const router = require("express").Router();

// import user controller functions
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

//  /api/users route to create a user
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId route to view, update, or delete single user
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);



module.exports = router;

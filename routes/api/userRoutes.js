const router = require("express").Router();

// import user controller functions
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/userController");

//  /api/users/ route to create a user
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId route to view, update, or delete single user
router
  .route("/:userId")
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

//  /api/users/:userId/friends route to add new friend
router.route("/:userId/friends").get(getOneUser).post(addFriend);

//  /api/users/:userId/friends/:friendId route to delete a friend
router.route("/:userId/friends/:friendId").delete(deleteFriend);


module.exports = router;

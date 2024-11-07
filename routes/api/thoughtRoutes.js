const router = require("express").Router();

// import thought controller functions
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

//  /api/thoughts route to create a thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId route to view, update, or delete single thought
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

//   /api/thoughts/:thoughtId/reactions route to create a reaction
router.route("/:thoughtId/reactions").get(getOneThought).post(addReaction);

//   /api/thoughts/:thoughtId/reactions/:reactionId route to delete a reaction
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);


module.exports = router;

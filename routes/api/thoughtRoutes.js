const router = require("express").Router();

// import user controller functions
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

//  /api/thoughts route to create a thought
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId route to view, update, or delete single thought
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);


module.exports = router;

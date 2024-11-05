// import ObjectId method and models
const { ObjectId } = require('mongoose').Types;
const { Thought } = require("../models");


module.exports = {
  // get all thoughts (include reactionCount virtual)
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtsObj = {
        thoughts,
        reactionCount: await reactionCount(),
      };
      return res.status(200).json(thoughtsObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a single thought with reaction data
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate("reactions")
        .lean(); // return a plain JavaScript object

      // return error message if thought not found
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID found" });
      }
      // otherwise return thought data
      res.status(200).json({
        thought,
        reactionCount: await reactionCount(),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        // ensure that updated thought adheres to validation rules set in the schema
        // return the updated (new) document rather than the original
        { runValidators: true, new: true }
      );
      // return error message if thought not found
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID found" });
      }
      // otherwise return updated thought data
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // delete a thought and their associated reactions
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      // return error message if thought not found
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID found" });
      }
      // delete associated reactions within the thought's reactions array
      await Thought.deleteMany({ _id: { $in: thoughts.reactions } });

      res
        .status(200)
        .json({ message: "Thought and associated reactions have been deleted." });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};



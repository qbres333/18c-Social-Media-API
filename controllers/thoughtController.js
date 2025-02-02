// import ObjectId method and models
const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require("../models");


module.exports = {
  // get all thoughts (includes reactionCount virtual)
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-id"); // removed .lean() to allow virtuals to work; .select('-id') 

      return res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a single thought with reaction data
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      // return error message if thought not found
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID found" });
      }
      // otherwise return thought data
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create new thought
  async createThought(req, res) {
    try {
      // create new thought
      const thought = await Thought.create(req.body);

      // add thought id to user's thoughts array
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      console.log(thought._id);
      console.log(req.body.username); //undefined, userId is also undefined

      res.status(200).json({ thought, message: 'Thought created and added to user successfully'});
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
      // return updated thought data
      res.status(200).json({ thought, message: "Thought updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // delete a thought and its associated reactions
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId
      });
      // return error message if thought not found
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with that ID found" });
      }
      // delete associated reactions within the thought's reactions array
      await Thought.deleteMany({ _id: { $in: thought.reactions } });

      res.status(200).json({
        message: "Thought and associated reactions have been deleted.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // add reaction        //reference thoughtId
  async addReaction(req, res) {
    try {
      // find the thought (return error if not found)
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      // return error message if thought not found
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      // return json response
      return res
        .status(200)
        .json({ thought, message: "Reaction added successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // delete reaction        //reference thoughtId, reactionId
  async deleteReaction(req, res) {
    try {
      // find the thought (return error if not found)
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // use Mongoose $pull method to remove reaction from reactions array
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      // return error message if thought not found
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID" });
      }

      res
        .status(200)
        .json({ thought, message: "Reaction deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

};



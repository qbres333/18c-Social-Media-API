// import ObjectId method and models
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // get all users (includes friendCount virtual)
  async getAllUsers(req, res) {
    try {
      const users = await User.find(); 

      // return user data
      return res.status(200).json(users);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // get a single user with thought and friend data
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts") //show user's thought data
        .populate('friends'); //show user's friend data

      // return error message if user not found
      if (!user) {
        return res.status(404).json({ message: "No user with that ID found" });
      }
      // return user data
      res.status(200).json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // update user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        // ensure that updated user adheres to validation rules set in the schema
        // return the updated (new) document rather than the original
        { runValidators: true, new: true }
      );

      // return error message if user not found
      if (!user) {
        return res.status(404).json({ message: "No user with that ID found" });
      }
      // otherwise return updated user data
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // delete a user and their associated thoughts; mod18 act 28
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { runValidators: true, new: true }
      );
      // return error message if user not found
      if (!user) {
        return res.status(404).json({ message: "No user with that ID found" });
      }
      // delete associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      res
        .status(200)
        .json({ message: "User and associated thoughts have been deleted." });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // add friend to user friend list      // reference userId
  async addFriend(req, res) {
    try {
      // find the user (return error if not found)
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );
      // return error message if user not found
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      return res
        .status(200)
        .json({ user, message: "Friend added successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // delete friend from friend list   // reference userId, friendId
  async deleteFriend(req, res) {
    try {
      // find the user (return error if not found)
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // use Mongoose $pull method to remove friend from friends array
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      // return error message if user not found
      if (!user) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.status(200).json({ user, message: "Friend deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
  },

};





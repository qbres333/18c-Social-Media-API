// import ObjectId method and models
// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users (include friendCount virtual)
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            const usersObj = {
                users,
                friendCount: await friendCount(),
            }
            return res.status(200).json(usersObj);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // get a single user with thought and friend data
    async getOneUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .lean(); // return a plain JavaScript object

          // return error message if user not found
          if (!user) {
            return res
              .status(404)
              .json({ message: "No user with that ID found" });
          }
          // otherwise return user data
          res.status(200).json({
            user,
            friendCount: await friendCount(),
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
                return res.status(404).json({ message: 'No user with that ID found'});
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
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            // return error message if user not found
            if (!user) {
                return res
                  .status(404)
                  .json({ message: "No user with that ID found" });
            }
            // delete associated thoughts
            await Thought.deleteMany({ _id: {$in: user.thoughts } });

            res.status(200).json({ message: "User and associated thoughts have been deleted." });
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
    },

};




